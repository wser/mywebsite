/** Display as pretty JSON */
	if (typeof JSON !== "object") {
		JSON = {}
	}(function () {
		var a;

		function b(o, q, n, h) {
			var s, c, m, p = n[q];
			switch (typeof p) {
				case "string":
					return '<span class="value">\'' + p + "'</span>";
				case "object":
					m = [];
					if (Object.prototype.toString.apply(p) === "[object Array]") {
						c = p.length;
						for (var f = 0; f < c; f += 1) {
							m[f] = b(o + a, f, p, h) || "null"
						}
						var l = (m.length == 0 || m[0].indexOf("{") != -1);
						if (l) {
							s = "\n" + o + a + "[" + o + m.join(",") + "\n" + o + a + "]"
						} else {
							if (h) {
								for (var e = 0; e < m.length; e++) {
									m[e] = "\n" + o + a + (o != a ? a : "") + m[e]
								}
								s = "[" + m.join(", ") + "\n" + o + (o != a ? a : "") + "]"
							} else {
								s = "[" + m.join(", ") + "]"
							}
						}
						return s
					}
					for (var d in p) {
						if (Object.prototype.hasOwnProperty.call(p, d)) {
							s = b(o + a, d, p, h);
							if (s) {
								var g = '<span class="key">' + d + "</span>";
								m.push(o + a + (o ? a : "") + g + (o ? ": " : ": ") + s)
							}
						}
					}
					s = (o ? "\n" : "") + (o ? o + a : o) + "{\n" + m.join(",\n") + "\n" + o + (o ? a : "") + "}";
					return s
			}
		}
		JSON.convertToHumanReadableString = function (f, e, d) {
			var c;
			a = "";
			for (c = 0; c < e; c += 1) {
				a += " "
			}
			return b("", "", {
				"": f
			}, d)
		}
	}());
	var contentId = "wcontent";

	function getContentElement() {
		return document.getElementById(contentId)
	}

	function getScrollLeft() {
		return (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft
	}

	function getScrollTop() {
		return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
	}

	function centerContent() {
		var b = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		var a = (window.innerHeight > 0) ? window.innerHeight : screen.height;
		getContentElement().style.top = Math.max(0, ((a - getContentElement().offsetHeight) / 2) + getScrollTop()) + "px";
		getContentElement().style.left = Math.max(0, ((b - getContentElement().offsetWidth) / 2) + getScrollLeft()) + "px"
	}

	function r(a) {
		/in/.test(document.readyState) ? setTimeout("r(" + a + ")", 9) : a()
	}
	r(function () {
		reloadContent()
	});
	window.onresize = function (a) {
		reloadContent()
	};

	function setContent(a) {
		let c = document.getElementById("wcontainer")
		c.innerHTML = a
	}

	function reloadContent() {
		setContent(compileContent());
		centerContent()
	}

	function flip(){
		alert("hello")
	}

	function compileContent() {
		var a = "ofni.civokadiv/ofni".split("").reverse().join("").replace("/", "@");
		var b = {
			name: "v info",
			keywords: "efficiency, flexibility, punctuality, credibility, validity",
			description: "Modern multiplatform solutions",
			headquarters: {
				company: '<a href="http://vidakovic.info" target="_blank">vidakovic.info</a>',
				location: "Brdovec, Croatia"
			},
			interests: {
				type: "Customers",
				state: "General satisfaction"
			},
			/* work:{
				viktor: '<a class="item" href="http://viktor.vidakovic.info" target="_blank">viktor</a>',
				andrijana: '<a class="item" href="http://andrijana.vidakovic.info" target="_blank">andrijana</a>'
			}, */
			work: '<a href="#" onclick="flip(); return false;">link</a>',
			contact: [
				'<a class="item" href="mailto:' + a + '">' + a + "</a>", 
				'<a class="item" href="https://www.linkedin.com/in/viktor-vidakovic" target="_blank">linkedIn</a>',
				'<a class="item" href="https://www.facebook.com/imenprezime" target="_blank">facebook</a>'
			]
		};
		return (
			
			"<pre id='" + contentId + "'>" +
				JSON.convertToHumanReadableString(b, 2, window.innerHeight > window.innerWidth) +
			"</pre>"+
			"<div id='vinfo'>v <span id='info'>info</span></div>"
		)
	};
/** */

/** Tilt element */
	VanillaTilt.init(document.querySelector("#wcontainer"), {
		reverse:            false,  // reverse the tilt direction
		max:                40,     // max tilt rotation (degrees)
		perspective:        1000,   // Transform perspective, the lower the more extreme the tilt gets.
		scale:              1.4,      // 2 = 200%, 1.5 = 150%, etc..
		speed:              300,    // Speed of the enter/exit transition
		transition:         true,   // Set a transition on enter/exit.
		axis:               null,   // What axis should be disabled. Can be X or Y.
		reset:              true,    // If the tilt effect has to be reset on exit.
		easing:             "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
		glare:              false,   // if it should have a "glare" effect
		"max-glare":        .5,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
		"glare-prerender":  false   // false = VanillaTilt creates the glare elements for you, otherwise
																// you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself */
	});
/** */

/** Card flipping */
	var card = document.querySelector('.wcard');
	var cont = document.getElementById('wcontainer');

	card.addEventListener( 'click', function() {
		card.classList.toggle('is-flipped');
	});
/** */

/** Scroll To */
	function scrollTo(element, to = 0, duration= 1000) {

		const start = element.scrollTop;
		const change = to - start;
		const increment = 20;
		let currentTime = 0;

		const animateScroll = (() => {

			currentTime += increment;

			const val = Math.easeInOutQuad(currentTime, start, change, duration);

			element.scrollTop = val;

			if (currentTime < duration) {
				setTimeout(animateScroll, increment);
			}
		});

		animateScroll();
	};

	Math.easeInOutQuad = function (t, b, c, d) {

		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	};

	//Ex: scrollTo(document.documentElement);
/** */

/** Sticky navigation bar */
/* 	const wrap = document.querySelector('#wrap');

	const navTop = wrap.offsetTop;

	function stickyNavigation() {

		if (this.scrollY >= navTop-5) {
			wrap.classList.add("fix-search");
			wrap.classList.remove("fix-search");
		}
	}

	window.addEventListener('scroll', stickyNavigation); */


/** */

/** Scrollspy */
	function scrollToY(e, t, n) {
		function o() {
			var t = (i += 1 / 60) / a,
				u = c[n](t);
			t < 1 ? (requestAnimFrame(o), window.scrollTo(0, r + (e - r) * u)) : window.scrollTo(0, e)
		}
		var r = window.scrollY || document.documentElement.scrollTop,
			i = 0;
		e = e || 0, t = t || 2e3, n = n || "easeOutSine";
		var a = Math.max(.1, Math.min(Math.abs(r - e) / t, .8)),
			c = {
				easeOutSine: function (e) {
					return Math.sin(e * (Math.PI / 2))
				},
				easeInOutSine: function (e) {
					return -.5 * (Math.cos(Math.PI * e) - 1)
				},
				easeInOutQuint: function (e) {
					return (e /= .5) < 1 ? .5 * Math.pow(e, 5) : .5 * (Math.pow(e - 2, 5) + 2)
				}
			};
		o()
	}

	function menuControl(e) {
		for (var t = window.scrollY || document.documentElement.scrollTop, n = e.querySelectorAll('a[href^="#"]'), o = 0; o < n.length; o++) {
			var r = n[o],
				i = document.querySelector(r.getAttribute("href"));
			i.offsetTop <= t && i.offsetTop + i.clientHeight > t ? r.classList.add("active") : r.classList.remove("active")
		}
	}

	function animated(e, t, n) {
		var o, r = e.querySelectorAll('a[href^="#"]');
		for (o = 0; o < r.length; o++) r[o].addEventListener("click", function (e) {
			e.preventDefault(), scrollToY(document.querySelector(this.hash).offsetTop, t, n)
		})
	}

	function scrollSpy(e, t, n) {
		animated(e, t, n), document.addEventListener("scroll", function () {
			menuControl(e)
		})
	}
	window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e) {
		window.setTimeout(e, 1e3 / 60)
	};
/** */