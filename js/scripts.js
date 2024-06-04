const photoInput = document.getElementById("photo");

photoInput.addEventListener("change", handleFile, false);
let photoFile = null;

function handleFile() {
  if (this.files) {
    photoFile = this.files[0];
  } else {
    photoFile = null;
  }
}

document.getElementById("review-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value;
  const socials = document.getElementById("socials").value;
  const description = document.getElementById("description").value;

  const saveReview = (photoData = null) => {
    const review = {
      fullname,
      socials,
      description,
      photo: photoData,
      date: new Date().toLocaleDateString(),
    };

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    alert("Ваш отзыв был успешно сохранен!");
    document.getElementById("review-form").reset();
    photoInput.value = null;
    displayReview(review);
  };

  if (photoFile) {
    const reader = new FileReader();
    reader.readAsDataURL(photoFile);
    reader.onload = () => {
      saveReview(reader.result);
    };
  } else {
    saveReview();
  }
});

const reviewsContainer = document.querySelector(
  "#reviews-container .swiper-wrapper"
);

function displayReview(review) {
  const reviewElement = document.createElement("div");
  reviewElement.classList.add("swiper-slide");
  reviewElement.innerHTML = `
      <div class="bg-white rounded-3xl p-8 flex flex-col space-y-12 justify-between leading-normal">
        <div class="flex flex-col space-y-4">
          <p class="text-xs sm:text-base text-[#ADB5BD] flex items-center">
            ${review.date}
          </p>
          <p class="text-sm sm:text-lg">
            ${review.description}
          </p>
        </div>
        <div class="flex items-center">
          <img class="w-10 h-10 rounded-full mr-4" src="${
            review.photo || "/img/default-user.png"
          }" alt="Avatar of ${review.fullname}" />
          <div class="text-sm">
            <p class="font-medium sm:text-lg leading-none">
              ${review.fullname}
            </p>
            ${review.socials ? `<a href="${review.socials}" class="text-gray-600 underline">ВКонтакте</a>` : ''}
          </div>
        </div>
      </div>
    `;
  reviewsContainer.appendChild(reviewElement);
}

function displayReviews() {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.forEach(displayReview);
}

// Display reviews on page load
document.addEventListener("DOMContentLoaded", displayReviews);
