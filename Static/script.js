var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-content");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
        if (tabcontent.id === tabname) {
            tabcontent.classList.add("active-tab");
        }
    }
    event.currentTarget.classList.add("active-link");
    document.getElementsById(tabname).classList.add("active-tab");
}

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("#header nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
            const targetId = this.getAttribute("href").substring(1); // Lấy ID mục tiêu từ thuộc tính href
            const targetElement = document.getElementById(targetId); // Tìm đối tượng mục tiêu dựa trên ID
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" }); // Cuộn trang đến đối tượng mục tiêu với hiệu ứng mượt
            }
        });
    });
});


window.addEventListener("DOMContentLoaded",() => {
	const fr = new FaceRating("#face-rating");
});

class FaceRating {
	constructor(qs) {
		this.input = document.querySelector(qs);
		this.input?.addEventListener("input",this.update.bind(this));
		this.face = this.input?.previousElementSibling;
		this.update();
	}
	update(e) {
		let value = this.input.defaultValue;

		// when manually set
		if (e) value = e.target?.value;
		// when initiated
		else this.input.value = value;

		const min = this.input.min || 0;
		const max = this.input.max || 100;
		const percentRaw = (value - min) / (max - min) * 100;
		const percent = +percentRaw.toFixed(2);

		this.input?.style.setProperty("--percent",`${percent}%`);

		// face and range fill colors
		const maxHue = 120;
		const hueExtend = 30;
		const hue = Math.round(maxHue * percent / 100);

		let hue2 = hue - hueExtend;
		if (hue2 < 0) hue2 += 360;

		const hues = [hue,hue2];
		hues.forEach((h,i) => {
			this.face?.style.setProperty(`--face-hue${i + 1}`,h);
		});

		this.input?.style.setProperty("--input-hue",hue);

		// emotions
		const duration = 1;
		const delay = -(duration * 0.99) * percent / 100;
		const parts = ["right","left","mouth-lower","mouth-upper"];

		parts.forEach(p => {
			const el = this.face?.querySelector(`[data-${p}]`);
			el?.style.setProperty(`--delay-${p}`,`${delay}s`);
		});

		// aria label
		const faces = [
			"Sad face",
			"Slightly sad face",
			"Straight face",
			"Slightly happy face",
			"Happy face"
		];
		let faceIndex = Math.floor(faces.length * percent / 100);
		if (faceIndex === faces.length) --faceIndex;

		this.face?.setAttribute("aria-label",faces[faceIndex]);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const cursor = document.getElementById("cursor");
  
	document.addEventListener("mousemove", function (e) {
	  const x = e.clientX;
	  const y = e.clientY;
  
	  cursor.style.transform = `translate(${x}px, ${y}px)`;

	  const trail = document.createElement("div");
	  trail.className = "cursor-trail";
	  trail.style.left = x + "px";
	  trail.style.top = y + "px";
  
	  document.body.appendChild(trail);
  
	  setTimeout(() => {
		trail.remove();
	  }, 500);
	});
  });

  
  document.addEventListener("scroll", function () {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    customScrollbar.style.opacity = scrollPercentage > 5 ? 1 : 0;
});
  
