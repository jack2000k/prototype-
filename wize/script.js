document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links (common for all pages)
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const sectionId = link.getAttribute("href");
      if (sectionId.startsWith("#")) {
        document.querySelector(sectionId).scrollIntoView({
          behavior: "smooth",
        });
      } else {
        window.location.href = sectionId;
      }
    });
  });

  // ----------------- JavaScript for konti.html -----------------
  const profileNameElement = document.querySelector(
    ".account-info p:nth-child(1)"
  );
  const profileEmailElement = document.getElementById("email");
  const profileMembershipElement = document.querySelector(
    ".account-info p:nth-child(3)"
  );

  // Check if we are on konti.html and localStorage has values
  if (profileNameElement && profileEmailElement && profileMembershipElement) {
    const storedName = localStorage.getItem("profileName");
    const storedEmail = localStorage.getItem("profileEmail");
    const storedMembership = localStorage.getItem("profileMembership");

    if (storedName)
      profileNameElement.innerHTML = `<strong>Amazina:</strong> ${storedName}`;
    if (storedEmail) profileEmailElement.textContent = storedEmail;
    if (storedMembership)
      profileMembershipElement.innerHTML = `<strong>Ubunyamuryango:</strong> ${storedMembership}`;
  }

  // ----------------- JavaScript for editProfile.html -----------------
  const editProfileForm = document.querySelector("#edit-profile form");
  if (editProfileForm) {
    editProfileForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Get updated values from the form inputs
      const updatedName = document.getElementById("name").value;
      const updatedEmail = document.getElementById("email").value;
      const updatedMembership = document.getElementById("membership").value;

      // Store updated values in localStorage
      localStorage.setItem("profileName", updatedName);
      localStorage.setItem("profileEmail", updatedEmail);
      localStorage.setItem("profileMembership", updatedMembership);

      alert("Profile updated successfully!");

      // Redirect to konti.html to see the updated information
      window.location.href = "konti.html";
    });

    // Pre-fill the form fields with data from localStorage if available
    const storedName = localStorage.getItem("profileName");
    const storedEmail = localStorage.getItem("profileEmail");
    const storedMembership = localStorage.getItem("profileMembership");

    if (storedName) document.getElementById("name").value = storedName;
    if (storedEmail) document.getElementById("email").value = storedEmail;
    if (storedMembership)
      document.getElementById("membership").value = storedMembership;
  }

  // ----------------- JavaScript for product-listing.html -----------------
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const sortSelect = document.getElementById("sortSelect");
  const productList = document.querySelectorAll(".product-list .product");

  // Function to filter products based on search input
  const filterProducts = () => {
    const searchTerm = searchInput.value.toLowerCase();
    productList.forEach((product) => {
      const productName = product.querySelector("h3").textContent.toLowerCase();
      product.style.display = productName.includes(searchTerm)
        ? "block"
        : "none";
    });
  };

  // Event listener for search button and search input
  searchButton.addEventListener("click", filterProducts);
  searchInput.addEventListener("keyup", filterProducts);

  // Function to sort products
  const sortProducts = () => {
    const sortValue = sortSelect.value;
    const productsArray = Array.from(productList);
    const productListContainer = document.querySelector(".product-list");

    // Sort products based on the selected option
    if (sortValue === "priceLowToHigh") {
      productsArray.sort((a, b) => {
        const priceA = parseInt(a.querySelector(".price").textContent);
        const priceB = parseInt(b.querySelector(".price").textContent);
        return priceA - priceB;
      });
    } else if (sortValue === "priceHighToLow") {
      productsArray.sort((a, b) => {
        const priceA = parseInt(a.querySelector(".price").textContent);
        const priceB = parseInt(b.querySelector(".price").textContent);
        return priceB - priceA;
      });
    }

    // Append sorted products back to the product list container
    productsArray.forEach((product) => {
      productListContainer.appendChild(product);
    });
  };

  // Event listener for sorting selection
  sortSelect.addEventListener("change", sortProducts);

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.parentElement.querySelector("h3").textContent;
      alert(`"${productName}" yongewe kubyo ugura!`);
    });
  });

  // ----------------- JavaScript for signin.html -----------------
  const authForm = document.querySelector("#auth-form form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const userTypeSelect = document.getElementById("user-type");

  // Function to handle sign-in form submission
  const handleSignIn = (event) => {
    event.preventDefault(); // Prevent form submission

    const email = emailInput.value;
    const password = passwordInput.value;
    const userType = userTypeSelect.value;

    // Example form validation logic
    if (!email || !password || !userType) {
      alert("Nyamuneka wujuje amakuru yose asabwa.");
      return;
    }

    // Simulate successful sign-in
    alert(`Murakaza neza, ${userType === "seller" ? "Umuhinzi" : "Umuguzi"}!`);

    // Redirect to dashboard (in a real application, form submission would be handled by the server)
    window.location.href = "dashboard.html";
  };

  // Attach event listener to the sign-in form
  if (authForm) {
    authForm.addEventListener("submit", handleSignIn);
  }

  // ----------------- JavaScript for ibiciro page -----------------
  const priceTable = document.querySelector("#price-list tbody");
  const filterButton = document.querySelector("#filter-button");
  const onionTypeSelect = document.querySelector("#onion-type");
  const locationSelect = document.querySelector("#location");

  // Filter Onion Types and Locations
  filterButton.addEventListener("click", () => {
    const selectedType = onionTypeSelect.value;
    const selectedLocation = locationSelect.value;

    // Show or hide rows based on selected type and location
    const rows = priceTable.querySelectorAll("tr");
    rows.forEach((row) => {
      const type = row.getAttribute("data-type");
      const location = row.getAttribute("data-location");
      const isMatch =
        (selectedType === "all" || type === selectedType) &&
        (selectedLocation === "all" || location === selectedLocation);
      row.style.display = isMatch ? "" : "none";
    });
  });

  // Calculate Estimated Distance from User Location
  const calculateButton = document.querySelector("#calculate-distance");
  const distanceInput = document.querySelector("#distance-location");
  const distanceResult = document.querySelector("#distance-result");

  calculateButton.addEventListener("click", () => {
    const userLocation = distanceInput.value.toLowerCase();
    const distances = {
      rubavu: 150,
      musanze: 80,
      rusizi: 240,
      huye: 130,
      kigali: 0,
    };

    if (distances[userLocation] !== undefined) {
      distanceResult.textContent = `Intera iri hagati yawe n'umuturage wo ${
        userLocation.charAt(0).toUpperCase() + userLocation.slice(1)
      } ni ${distances[userLocation]} Km.`;
    } else {
      distanceResult.textContent = "Injiza umujyi nyamwaro.";
    }
  });

  // Price Alert Subscription
  const subscribeButton = document.querySelector("#subscribe-button");
  const subscriptionMessage = document.querySelector("#subscription-message");

  subscribeButton.addEventListener("click", () => {
    const email = emailInput.value;
    if (validateEmail(email)) {
      subscriptionMessage.textContent = `Urakoze! Tuzakwekere amakuru ku giciro.`; // Update with your message.
    } else {
      subscriptionMessage.textContent = "Injiza aderesi y'imeri y'ukuri."; // Update with your message.
    }
  });

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
});
