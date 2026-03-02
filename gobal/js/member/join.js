document.addEventListener("DOMContentLoaded", () => {
  // ===== 주소 찾기 =====
  const findZip = document.getElementById("findZip");
  const zip = document.getElementById("zip");
  const addr1 = document.getElementById("addr1");
  const addr2 = document.getElementById("addr2");

  console.log("zip/addr1/addr2:", zip, addr1, addr2);

  if (findZip) {
    findZip.addEventListener("click", () => {
      new daum.Postcode({
        oncomplete: function (data) {
          console.log("postcode data:", data);
          zip.value = data.zonecode;
          addr1.value = data.roadAddress || data.address;
          addr2.value = "";
          addr2.focus();
        }
      }).open();
    });
  }

  // ===== 모달 =====
  const form = document.getElementById("joinForm");
  const successModal = document.getElementById("successModal");
  const goLoginBtn = document.getElementById("goLogin");

  function openSuccessModal() {
    successModal?.classList.add("modal-is-open");
    successModal?.setAttribute("aria-hidden", "false");
  }

  function closeSuccessModal() {
    successModal?.classList.remove("modal-is-open");
    successModal?.setAttribute("aria-hidden", "true");
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      openSuccessModal();
    });
  }

  successModal?.addEventListener("click", (e) => {
    if (e.target.dataset.close === "true") closeSuccessModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && successModal?.classList.contains("modal-is-open")) {
      closeSuccessModal();
    }
  });

  goLoginBtn?.addEventListener("click", () => {
    location.href = "../member/login.html";
  });
});

