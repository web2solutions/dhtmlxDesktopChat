try
{

	window['WebSocket'] = require('ws');
}catch(e)
{

}

/*======================= DETECT $dhx FW's LOCATION ========================*/
/*var scripTS = document.getElementsByTagName("script");
//var $dhx_location = scripTS[scripTS.length - 1].src.replace(/$dhx_fw.js/gi, "");
var $dhx_location = scripTS[scripTS.length - 1].src.replace("dhx.js?uid=", "").replace(/\d/g, "").replace("mark.web.", "mark.web2.").replace(/dhx.js/gi, "");
$dhx_location = $dhx_location.split("$dhx_fw.js")[0];
//console.log($dhx_location);
try {
	var _img = new Image();
	_img.src = $dhx_location + "imgs/splash.png";
}
catch(e) {}*/
/*======================= $dhx FW ========================*/
var $dhx = {
	windowWidth: 0,
	windowHeight: 0,
	/** 
		@function loadScript -  load javascript files - code injection
		@param {string}	url - the url of a given javascript file which will be loaded
		@param {function}	callback - 	function  callback which will be executed after the javascript file 100% loaded
	*/
	loadScript: function (url, callback) {
			url = url + ".js";
			var script = document.createElement('script');
			script.type = 'text/javascript';
			if(script.readyState) { //IE
				script.onreadystatechange = function () {
					if(script.readyState == 'loaded' ||
						script.readyState == 'complete') {
						script.onreadystatechange = null;
						callback();
					}
				};
			}
			else { //Others
				script.onload = function () {
					callback();
				};
			}
			script.src = url;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
		/* load javascript files - code injection */
		,
	onDemand: {
		queue: [],
		load: function (url, callback) {
			var self = $dhx.onDemand;
			//console.log("load");
			$dhx.exposeForEach();
			if($dhx.isArray(url)) {
				url.forEach(function (path, index, array) {
					self.queue.push(path);
				});
			}
			else {
				self.queue.push(url);
			}
			$dhx.showDirections("Loading_Files");
			self.process_queue(callback);
		},
		process_queue: function (callback) {
			var self = $dhx.onDemand;
			//console.log(self.queue.length);
			if(self.queue.length > 0) {
				var first_on_queue = self.queue.shift();
				$dhx.lScript(first_on_queue, function () {
					self.process_queue(callback);
				});
			}
			else {
				$dhx.hideDirections();
				callback();
			}
		}
	}
	/**
		@function loadScript -  load script - code injection
		@param {string}	url - the url of a given javascript file which will be loaded
		@param {function}	callback - 	function  callback which will be executed after the javascript file 100% loaded
	*/
	,
	lScript: function (url, callback) {
			var self = this,
				arrType, type, s, nodeType, node;
			//console.log("lScript");
			if(typeof document.getElementById(url) !== null) {
				arrType = url.split(".");
				type = arrType[arrType.length - 1];
				//console.log(url);
				if(type === 'css') {
					nodeType = "link";
					node = document.createElement(nodeType);
					node.setAttribute("rel", "stylesheet");
					node.setAttribute("type", "text/css");
					if(url.indexOf("?") != -1)
						node.setAttribute("href", url);
					else
						node.setAttribute("href", url);
				}
				else {
					nodeType = "script";
					node = document.createElement(nodeType);
					node.setAttribute("type", "text/javascript");
					if(url.indexOf("?") != -1)
						node.setAttribute("src", url);
					else
						node.setAttribute("src", url);
				}
				node.setAttribute("id", url);
				if(node.readyState) {
					//console.log("ie");
					node.onreadystatechange = function () {
						if(node.readyState == 'loaded' ||
							node.readyState == 'complete') {
							//console.log("loaded");
							node.onreadystatechange = null;
							callback();
						}
					};
				}
				else {
					//console.log(type);
					if(type === 'css') {
						callback();
					}
					else {
						//console.log("no ie");
						//console.log(node.onload);
						node.onload = function () {
							//console.log("loaded");
							callback();
						};
					}
				}
				//console.log(document.getElementsByTagName('head')[0].appendChild(node));
				document.getElementsByTagName('head')[0].appendChild(node);
				//s = document.getElementsByTagName('script')[0];
				//s.parentNode.insertBefore(node, s);
			}
		}
		/* load script - code injection */
		,
	Encoder: {
		EncodeType: "entity",
		isEmpty: function (val) {
			if(val) {
				return((val === null) || val.length == 0 || /^\s+$/.test(val))
			}
			else {
				return true
			}
		},
		arr1: new Array('&nbsp;', '&iexcl;', '&cent;', '&pound;', '&curren;', '&yen;', '&brvbar;', '&sect;', '&uml;', '&copy;', '&ordf;', '&laquo;', '&not;', '&shy;', '&reg;', '&macr;', '&deg;', '&plusmn;', '&sup2;', '&sup3;', '&acute;', '&micro;', '&para;', '&middot;', '&cedil;', '&sup1;', '&ordm;', '&raquo;', '&frac14;', '&frac12;', '&frac34;', '&iquest;', '&Agrave;', '&Aacute;', '&Acirc;', '&Atilde;', '&Auml;', '&Aring;', '&Aelig;', '&Ccedil;', '&Egrave;', '&Eacute;', '&Ecirc;', '&Euml;', '&Igrave;', '&Iacute;', '&Icirc;', '&Iuml;', '&ETH;', '&Ntilde;', '&Ograve;', '&Oacute;', '&Ocirc;', '&Otilde;', '&Ouml;', '&times;', '&Oslash;', '&Ugrave;', '&Uacute;', '&Ucirc;', '&Uuml;', '&Yacute;', '&THORN;', '&szlig;', '&agrave;', '&aacute;', '&acirc;', '&atilde;', '&auml;', '&aring;', '&aelig;', '&ccedil;', '&egrave;', '&eacute;', '&ecirc;', '&euml;', '&igrave;', '&iacute;', '&icirc;', '&iuml;', '&eth;', '&ntilde;', '&ograve;', '&oacute;', '&ocirc;', '&otilde;', '&ouml;', '&divide;', '&Oslash;', '&ugrave;', '&uacute;', '&ucirc;', '&uuml;', '&yacute;', '&thorn;', '&yuml;', '&quot;', '&amp;', '&lt;', '&gt;', '&oelig;', '&oelig;', '&scaron;', '&scaron;', '&yuml;', '&circ;', '&tilde;', '&ensp;', '&emsp;', '&thinsp;', '&zwnj;', '&zwj;', '&lrm;', '&rlm;', '&ndash;', '&mdash;', '&lsquo;', '&rsquo;', '&sbquo;', '&ldquo;', '&rdquo;', '&bdquo;', '&dagger;', '&dagger;', '&permil;', '&lsaquo;', '&rsaquo;', '&euro;', '&fnof;', '&alpha;', '&beta;', '&gamma;', '&delta;', '&epsilon;', '&zeta;', '&eta;', '&theta;', '&iota;', '&kappa;', '&lambda;', '&mu;', '&nu;', '&xi;', '&omicron;', '&pi;', '&rho;', '&sigma;', '&tau;', '&upsilon;', '&phi;', '&chi;', '&psi;', '&omega;', '&alpha;', '&beta;', '&gamma;', '&delta;', '&epsilon;', '&zeta;', '&eta;', '&theta;', '&iota;', '&kappa;', '&lambda;', '&mu;', '&nu;', '&xi;', '&omicron;', '&pi;', '&rho;', '&sigmaf;', '&sigma;', '&tau;', '&upsilon;', '&phi;', '&chi;', '&psi;', '&omega;', '&thetasym;', '&upsih;', '&piv;', '&bull;', '&hellip;', '&prime;', '&prime;', '&oline;', '&frasl;', '&weierp;', '&image;', '&real;', '&trade;', '&alefsym;', '&larr;', '&uarr;', '&rarr;', '&darr;', '&harr;', '&crarr;', '&larr;', '&uarr;', '&rarr;', '&darr;', '&harr;', '&forall;', '&part;', '&exist;', '&empty;', '&nabla;', '&isin;', '&notin;', '&ni;', '&prod;', '&sum;', '&minus;', '&lowast;', '&radic;', '&prop;', '&infin;', '&ang;', '&and;', '&or;', '&cap;', '&cup;', '&int;', '&there4;', '&sim;', '&cong;', '&asymp;', '&ne;', '&equiv;', '&le;', '&ge;', '&sub;', '&sup;', '&nsub;', '&sube;', '&supe;', '&oplus;', '&otimes;', '&perp;', '&sdot;', '&lceil;', '&rceil;', '&lfloor;', '&rfloor;', '&lang;', '&rang;', '&loz;', '&spades;', '&clubs;', '&hearts;', '&diams;'),
		arr2: new Array('&#160;', '&#161;', '&#162;', '&#163;', '&#164;', '&#165;', '&#166;', '&#167;', '&#168;', '&#169;', '&#170;', '&#171;', '&#172;', '&#173;', '&#174;', '&#175;', '&#176;', '&#177;', '&#178;', '&#179;', '&#180;', '&#181;', '&#182;', '&#183;', '&#184;', '&#185;', '&#186;', '&#187;', '&#188;', '&#189;', '&#190;', '&#191;', '&#192;', '&#193;', '&#194;', '&#195;', '&#196;', '&#197;', '&#198;', '&#199;', '&#200;', '&#201;', '&#202;', '&#203;', '&#204;', '&#205;', '&#206;', '&#207;', '&#208;', '&#209;', '&#210;', '&#211;', '&#212;', '&#213;', '&#214;', '&#215;', '&#216;', '&#217;', '&#218;', '&#219;', '&#220;', '&#221;', '&#222;', '&#223;', '&#224;', '&#225;', '&#226;', '&#227;', '&#228;', '&#229;', '&#230;', '&#231;', '&#232;', '&#233;', '&#234;', '&#235;', '&#236;', '&#237;', '&#238;', '&#239;', '&#240;', '&#241;', '&#242;', '&#243;', '&#244;', '&#245;', '&#246;', '&#247;', '&#248;', '&#249;', '&#250;', '&#251;', '&#252;', '&#253;', '&#254;', '&#255;', '&#34;', '&#38;', '&#60;', '&#62;', '&#338;', '&#339;', '&#352;', '&#353;', '&#376;', '&#710;', '&#732;', '&#8194;', '&#8195;', '&#8201;', '&#8204;', '&#8205;', '&#8206;', '&#8207;', '&#8211;', '&#8212;', '&#8216;', '&#8217;', '&#8218;', '&#8220;', '&#8221;', '&#8222;', '&#8224;', '&#8225;', '&#8240;', '&#8249;', '&#8250;', '&#8364;', '&#402;', '&#913;', '&#914;', '&#915;', '&#916;', '&#917;', '&#918;', '&#919;', '&#920;', '&#921;', '&#922;', '&#923;', '&#924;', '&#925;', '&#926;', '&#927;', '&#928;', '&#929;', '&#931;', '&#932;', '&#933;', '&#934;', '&#935;', '&#936;', '&#937;', '&#945;', '&#946;', '&#947;', '&#948;', '&#949;', '&#950;', '&#951;', '&#952;', '&#953;', '&#954;', '&#955;', '&#956;', '&#957;', '&#958;', '&#959;', '&#960;', '&#961;', '&#962;', '&#963;', '&#964;', '&#965;', '&#966;', '&#967;', '&#968;', '&#969;', '&#977;', '&#978;', '&#982;', '&#8226;', '&#8230;', '&#8242;', '&#8243;', '&#8254;', '&#8260;', '&#8472;', '&#8465;', '&#8476;', '&#8482;', '&#8501;', '&#8592;', '&#8593;', '&#8594;', '&#8595;', '&#8596;', '&#8629;', '&#8656;', '&#8657;', '&#8658;', '&#8659;', '&#8660;', '&#8704;', '&#8706;', '&#8707;', '&#8709;', '&#8711;', '&#8712;', '&#8713;', '&#8715;', '&#8719;', '&#8721;', '&#8722;', '&#8727;', '&#8730;', '&#8733;', '&#8734;', '&#8736;', '&#8743;', '&#8744;', '&#8745;', '&#8746;', '&#8747;', '&#8756;', '&#8764;', '&#8773;', '&#8776;', '&#8800;', '&#8801;', '&#8804;', '&#8805;', '&#8834;', '&#8835;', '&#8836;', '&#8838;', '&#8839;', '&#8853;', '&#8855;', '&#8869;', '&#8901;', '&#8968;', '&#8969;', '&#8970;', '&#8971;', '&#9001;', '&#9002;', '&#9674;', '&#9824;', '&#9827;', '&#9829;', '&#9830;'),
		HTML2Numerical: function (s) {
			return this.swapArrayVals(s, this.arr1, this.arr2)
		},
		NumericalToHTML: function (s) {
			return this.swapArrayVals(s, this.arr2, this.arr1)
		},
		numEncode: function (s) {
			if(this.isEmpty(s)) return "";
			var e = "";
			for(var i = 0; i < s.length; i++) {
				var c = s.charAt(i);
				if(c < " " || c > "~") {
					c = "&#" + c.charCodeAt() + ";"
				}
				e += c
			}
			return e
		},
		htmlDecode: function (s) {
			var c, m, d = s;
			if(this.isEmpty(d)) return "";
			d = this.HTML2Numerical(d);
			arr = d.match(/&#[0-9]{1,5};/g);
			if(arr != null) {
				for(var x = 0; x < arr.length; x++) {
					m = arr[x];
					c = m.substring(2, m.length - 1);
					if(c >= -32768 && c <= 65535) {
						d = d.replace(m, String.fromCharCode(c))
					}
					else {
						d = d.replace(m, "")
					}
				}
			}
			return d
		},
		htmlEncode: function (s, dbl) {
			if(this.isEmpty(s)) return "";
			dbl = dbl || false;
			if(dbl) {
				if(this.EncodeType == "numerical") {
					s = s.replace(/&/g, "&#38;")
				}
				else {
					s = s.replace(/&/g, "&amp;")
				}
			}
			s = this.XSSEncode(s, false);
			if(this.EncodeType == "numerical" || !dbl) {
				s = this.HTML2Numerical(s)
			}
			s = this.numEncode(s);
			if(!dbl) {
				s = s.replace(/&#/g, "##AMPHASH##");
				if(this.EncodeType == "numerical") {
					s = s.replace(/&/g, "&#38;")
				}
				else {
					s = s.replace(/&/g, "&amp;")
				}
				s = s.replace(/##AMPHASH##/g, "&#")
			}
			s = s.replace(/&#\d*([^\d;]|$)/g, "$1");
			if(!dbl) {
				s = this.correctEncoding(s)
			}
			if(this.EncodeType == "entity") {
				s = this.NumericalToHTML(s)
			}
			return s
		},
		XSSEncode: function (s, en) {
			if(!this.isEmpty(s)) {
				en = en || true;
				if(en) {
					s = s.replace(/\'/g, "&#39;");
					s = s.replace(/\"/g, "&quot;");
					s = s.replace(/</g, "&lt;");
					s = s.replace(/>/g, "&gt;")
				}
				else {
					s = s.replace(/\'/g, "&#39;");
					s = s.replace(/\"/g, "&#34;");
					s = s.replace(/</g, "&#60;");
					s = s.replace(/>/g, "&#62;")
				}
				return s
			}
			else {
				return ""
			}
		},
		hasEncoded: function (s) {
			if(/&#[0-9]{1,5};/g.test(s)) {
				return true
			}
			else if(/&[A-Z]{2,6};/gi.test(s)) {
				return true
			}
			else {
				return false
			}
		},
		stripUnicode: function (s) {
			return s.replace(/[^\x20-\x7E]/g, "")
		},
		correctEncoding: function (s) {
			return s.replace(/(&amp;)(amp;)+/, "$1")
		},
		swapArrayVals: function (s, arr1, arr2) {
			if(this.isEmpty(s)) return "";
			var re;
			if(arr1 && arr2) {
				if(arr1.length == arr2.length) {
					for(var x = 0, i = arr1.length; x < i; x++) {
						re = new RegExp(arr1[x], 'g');
						s = s.replace(re, arr2[x])
					}
				}
			}
			return s
		},
		inArray: function (item, arr) {
			for(var i = 0, x = arr.length; i < x; i++) {
				if(arr[i] === item) {
					return i
				}
			}
			return -1
		}
	},
	getMousePosition: function (e, cordinate) {
		//console.log("mouse");
		var isIE = document.all ? true : false;
		var _x;
		var _y;
		if(!isIE) {
			_x = e.pageX - 200;
			_y = e.pageY - 150;
		}
		if(isIE) {
			_x = (e.clientX + document.documentElement.scrollLeft + document.body.scrollLeft) - 200;
			_y = (e.clientY + document.documentElement.scrollTop + document.body.scrollTop) + 150;
		}
		if(cordinate == "y") {
			//console.log(cordinate + ": " + _y);
			return _y;
		}
		else {
			//console.log(cordinate + ": " + _x);
			return _x;
		}
	},
	getElementPosition: function (x, cordinate) {
		//console.log("element");
		var o = document.getElementById(x);
		var l = o.offsetLeft;
		var t = o.offsetTop;
		while(o = o.offsetParent)
			l += o.offsetLeft;
		o = document.getElementById(x);
		while(o = o.offsetParent)
			t += o.offsetTop;
		if(cordinate == "y") {
			//console.log(cordinate + ": " + _y);
			return t - 150;
		}
		else {
			//console.log(cordinate + ": " + _x);
			return l - 200;
		}
	},
	getPagePosition: function (cordinate, width, height) {
			var self = this,
				l = 0,
				t = 0,
				d = document,
				w = window;
			if(!window.pageYOffset) {
				if(!(document.documentElement.scrollTop == 0)) {
					t = d.documentElement.scrollTop;
					l = d.documentElement.clientWidth;
				}
				else {
					t = d.body.scrollTop;
					l = document.body.clientWidth;
				}
			}
			else {
				t = w.pageYOffset;
				l = w.innerWidth;
			}
			l = (l / 2) - (width / 2);
			if(window.innerHeight) {
				t = t + (window.innerHeight / 2) - (height / 2);
			}
			else {
				t = t + (document.body.clientHeight / 2) - (height / 2);
			}
			if(cordinate == "y") {
				return t;
			}
			else {
				return l;
			}
		}
		/**
		@object Browser -  performs Browser and OS identifying
		
		@property Browser.name
		@property Browser.version
		@property Browser.OS
			
			usable properties
				Browser.name
				Browser.version
				Browser.OS
	*/
		,
	Browser: {
		/* quirksmode.org */
		init: function () {
			this.name = this.searchString(this.dataBrowser) || "An unknown browser";
			this.onLine = (navigator.onLine) || "Unknow connection status";
			this.cookieEnabled = (navigator.cookieEnabled) || "Unknow cookies permission";
			this.plugins = (navigator.plugins) || "Unknow plugins";
			/*
			
			navigator.geolocation = [object Geolocation]
			navigator.onLine = true
			navigator.cookieEnabled = true
			navigator.vendorSub = 
			navigator.vendor = Google Inc.
			navigator.productSub = 20030107
			navigator.product = Gecko
			navigator.mimeTypes = [object MimeTypeArray]
			navigator.plugins = [object PluginArray]
			navigator.platform = Win32
			navigator.userAgent = Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31
			navigator.language = pt-BR
			navigator.appVersion = 5.0 (Windows NT 6.2) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31
			navigator.appName = Netscape
			navigator.appCodeName = Mozilla
			navigator.doNotTrack = null
			navigator.javaEnabled = function javaEnabled() { [native code] }
			navigator.getStorageUpdates = function getStorageUpdates() { [native code] }
			navigator.registerProtocolHandler = function registerProtocolHandler() { [native code] }
			navigator.webkitGetGamepads = function webkitGetGamepads() { [native code] }
			navigator.webkitGetUserMedia = function webkitGetUserMedia() { [native code] }
			
			*/
			this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function (data) {
			for(var i = 0; i < data.length; i++) {
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if(dataString) {
					if(dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				}
				else if(dataProp)
					return data[i].identity;
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if(index == -1) return;
			return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
		},
		isPlugin: function (which_plugin) {
			(typeof which_plugin === 'undefined') ? which_plugin = "notspecified": "";
			for(var plugin in $dhx.Browser.plugins) {
				if($dhx.Browser.plugins.hasOwnProperty(plugin)) {
					(typeof $dhx.Browser.plugins[plugin].name === 'undefined') ? $dhx.Browser.plugins[plugin].name = "Unknow plugin": "";
					var regex = new RegExp("" + which_plugin.toString() + "", "g");
					if(typeof $dhx.Browser.plugins[plugin].name !== 'undefined') {
						if($dhx.Browser.plugins[plugin].name.match(regex)) {
							return true;
						}
					}
				}
			}
			return false;
		},
		dataBrowser: [{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		}, {
			string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		}, {
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		}, {
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		}, {
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		}, {
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		}, {
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		}, {
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		}, { // for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		}, {
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		}, {
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		}, { // for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}],
		dataOS: [{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		}, {
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		}, {
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
		}, {
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}]
	}
	/**
		@function getAndSetWindowDimension -  get the current window width and height and set the public properties $dhx.windowWidth and $dhx.windowHeight
	*/
	,
	getAndSetWindowDimension: function () {
			var self = $dhx,
				d = document,
				w = window;
			// w3c
			if(w.innerWidth) {
				self.windowWidth = w.innerWidth;
				self.windowHeight = w.innerHeight;
			}
			else { // old IEs
				if(!(d.documentElement.scrollTop == 0)) {
					$dhx.windowWidth = d.documentElement.clientWidth;
					$dhx.windowHeight = d.documentElement.clientHeight;
				}
				else {
					$dhx.windowWidth = d.body.clientWidth;
					$dhx.windowHeight = d.body.clientHeight;
				}
			}
		}
		/**
		@function checkBrowserStuff -  check if the current browser is able to run AJAX applications
		@return {boolean} - true / false
	*/
		,
	checkBrowserStuff: function () {
			var self = this;
			self.Browser.init(); // init browser handler, mandatory, first
			self.getAndSetWindowDimension(); // mandatory, second
			var AJAX_avaliable = false;
			var XML_parsing_avaliable = false;
			if(self.Browser.name === 'Explorer') {
				//Try Parse an XML Document - used by ajax calls
				try {
					new ActiveXObject("Microsoft.XMLHTTP");
					//return true;
					//alert("success - AJAX Calls - Microsoft.XMLHTTP");
					AJAX_avaliable = true;
				}
				catch(e) {
					//IE7+
					if((new Number(self.Browser.version)) >= 7) {
						try {
							new XMLHttpRequest();
							//return true;
							//alert("success - AJAX Calls - XMLHttpRequest");
							AJAX_avaliable = true;
						}
						catch(e) {
							self.showDirections("MSXML");
							//return false;
						}
					}
					else {
						self.showDirections("MSXML");
						//return false;
					}
				}
				//Try Parse an XML String
				try {
					new ActiveXObject("Microsoft.XMLDOM");
					//return true;
					//alert("success - XML string parser - Microsoft.XMLDOM");
					XML_parsing_avaliable = true;
				}
				catch(e) {
					if((AJAX_avaliable) && (!XML_parsing_avaliable)) { // ie with no complements enabled
						self.showDirections("COMPONENTS_DISABLED");
					}
					else {
						self.showDirections("MSXML");
					}
					//return false;
				}
			}
			//alert(self.Browser.plugins);
		}
		/**
			@function checkMAPRequirements -  check if the current browser is able to run minimal requirements
			@return {boolean} - true / false
		*/
		,
	checkMAPRequirements: function () {
		var self = this;
		self.Browser.init(); // init browser handler, mandatory, first
		self.getAndSetWindowDimension(); // mandatory, second
		self.checkBrowserStuff();
		//console.log( $dhx.Browser.name ); // Chrome
		//console.log( $dhx.Browser.version ); // browser version
		if($dhx.Browser.name == "Chrome") {
			if($dhx.Browser.version < 13) {
				console.log("Browser is out to date");
				self.showDirections("BROWSER_VERSION_OUT_TO_DATE");
				return false;
			}
			if(!$dhx.Browser.isPlugin("Adobe Acrobat")) {
				console.log("PDF not present");
				self.showDirections("PDF_MISSING");
				return false;
			}
			console.log("Browser is OK");
			return true;
		}
		else if($dhx.Browser.name == "Firefox") {
			if($dhx.Browser.version < 5) {
				console.log("Browser is out to date");
				self.showDirections("BROWSER_VERSION_OUT_TO_DATE");
				return false;
			}
			if(!$dhx.Browser.isPlugin("Adobe Acrobat")) {
				console.log("PDF not present");
				self.showDirections("PDF_MISSING");
				return false;
			}
			console.log("Browser is OK");
			return true;
		}
		else if($dhx.Browser.name == "Safari") {
			if(!$dhx.Browser.isPlugin("Adobe Acrobat")) {
				console.log("PDF not present");
				self.showDirections("PDF_MISSING");
				return false;
			}
			console.log("Browser is OK");
			return true;
		}
		else if($dhx.Browser.name == "Explorer") {
			if($dhx.Browser.version < 8) {
				console.log("Browser is out to date");
				self.showDirections("BROWSER_VERSION_OUT_TO_DATE");
				return false;
			}
			try {
				var plugin = new ActiveXObject('AcroPDF.PDF');
			}
			catch(e) {
				try {
					// PDF.PdfCtrl is used by version 6 and earlier
					plugin = new ActiveXObject('PDF.PdfCtrl');
				}
				catch(e) {
					console.log("PDF not present");
					self.showDirections("PDF_MISSING");
					return false;
				}
			}
			console.log("Browser is OK");
			return true;
		}
		else {
			console.log("Browser vendor not allowed");
			self.showDirections("BROWSER_NOT_ALLOWED");
			return false;
		}
		//return true;
	},
	hideDirections: function () {
		try {
			document.getElementById("$dhx_wrapper_splash").style.display = "none";
			document.getElementById("$dhx_splash").style.display = "none";
		}
		catch(e) {}
	},
	showDirections: function (m) {
		var self = this,
			template = '',
			div_wrapper, div_splash;
			
		div_wrapper = document.createElement("DIV");
		div_wrapper.setAttribute("style", '-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)"; filter: alpha(opacity=50);');
		div_wrapper.setAttribute("id", '$dhx_wrapper_splash');
		div_wrapper.style.width = "100%";
		div_wrapper.style.height = "100%";
		div_wrapper.style.position = "fixed";
		div_wrapper.style.top = "0";
		div_wrapper.style.left = "0";
		div_wrapper.style.zIndex = "999888";
		div_wrapper.style.backgroundColor = "#000000";
		div_wrapper.style.opacity = "0.5";
		div_splash = document.createElement("DIV");
		div_splash.setAttribute("style", 'font-size:17px;padding-top:95px;padding-right:50px;padding-left:8px;color:#F0F0F0;line-height:18px;font-family:arial;');
		div_splash.setAttribute("id", '$dhx_splash');
		div_splash.style.width = "560px";
		div_splash.style.height = "243px";
		div_splash.style.position = "fixed";
		//div_splash.style.margin = "auto";
		if(self.windowHeight == 0) {
			self.getAndSetWindowDimension();
		}
		div_splash.style.top = ((self.windowHeight / 2) - 183) + "px";
		div_splash.style.left = ((self.windowWidth / 2) - 250) + "px";
		div_splash.style.zIndex = "999999";
		//div_splash.style.backgroundColor = "#ffffff";
		div_splash.style.backgroundImage = "url(" + $dhx_location + "imgs/splash.png)";
		div_splash.style.backgroundRepeat = "no-repeat";
		div_splash.style.opacity = "1";
		div_splash.style.textAlign = "left";
		
		
		if(m == "MSXML") {
			template = template + '<b>Your browser is out of date</b> <br>';
			template = template + 'Your computer does not have a necessary component installed <br>';
			template = template + '<b>Please click <a target="_blank" style="color:#003399;" href="http://www.microsoft.com/en-us/download/details.aspx?id=19662" title="download">here</a> to install the component or use Firefox or Google Chrome</b>';
		}
		else if(m == "COMPONENTS_DISABLED") {
			template = template + 'You are running Internet Explorer under <b>"no add-ons"</b> mode, <br>';
			template = template + 'or ActiveXs are disabled <br>';
			template = template + 'Close your browser and open the Internet Explorer again by reaching:<br><b>Start menu -> All Programs -> Internet Explorer</b>';
		}
		else if(m == "PDF_MISSING") {
			template = template + 'The Acrobat Reader plugin could not be found! <br>';
			template = template + 'If you are running IE, the ActiveXs may be disabled. Try to enable it. <br>';
			template = template + 'You can also try to install Acrobat reader. <b>Please click <a target="_blank" style="color:#003399;" href="http://get.adobe.com/br/reader/" title="download">here</a> to download and install free Acrobat Reader</b>';
		}
		else if(m == "BROWSER_VERSION_OUT_TO_DATE") {
			template = template + 'You are running ' + $dhx.Browser.name + ' ' + $dhx.Browser.version + '.<br>';
			template = template + 'This version is not supported anymore.<br>';
			template = template + 'Please download and install a new version of it.';
		}
		else if(m == "BROWSER_NOT_ALLOWED") {
			template = template + 'You are running ' + $dhx.Browser.name + ' ' + $dhx.Browser.version + '.<br>';
			template = template + 'This Browser vendor is not supported.<br>';
			template = template + 'List of supported browsers: <b>Internet Explorer 8+, Safari, Chrome 13+, Firefox 5+</b>';
		}
		else if(m == "Loading_Files") {
			template = template + '';
			template = template + '<b>Loading files ...</b><br>';
			template = template + 'please wait!';
		}
		else {
			template = template + '';
			template = template + m;
			template = template + 'please wait!';
		}
		div_splash.innerHTML = template;
		//document.getElementById("$dhx_wrapper_splash").style.display = "none";
		//document.getElementById("$dhx_splash").style.display = "none";
		if(document.getElementById("$dhx_wrapper_splash") === null) {
			try {
				document.body.appendChild(div_wrapper);
				document.body.appendChild(div_splash);
			}
			catch(e) {
				document.getElementsByTagName('body')[0].appendChild(div_wrapper);
				document.getElementsByTagName('body')[0].appendChild(div_splash);
			}
		}
		else {
			document.getElementById("$dhx_wrapper_splash").style.display = "block";
			document.getElementById("$dhx_splash").style.display = "block";
		}
	},
	exposeForEach: function () {
		// Production steps of ECMA-262, Edition 5, 15.4.4.18
		// Reference: http://es5.github.com/#x15.4.4.18
		if(!Array.prototype.forEach) {
			Array.prototype.forEach = function forEach(callback, thisArg) {
				var T, k;
				if(this == null) {
					throw new TypeError("this is null or not defined");
				}
				// 1. Let O be the result of calling ToObject passing the |this| value as the argument.
				var O = Object(this);
				// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
				// 3. Let len be ToUint32(lenValue).
				var len = O.length >>> 0; // Hack to convert O.length to a UInt32
				// 4. If IsCallable(callback) is false, throw a TypeError exception.
				// See: http://es5.github.com/#x9.11
				if({}.toString.call(callback) !== "[object Function]") {
					throw new TypeError(callback + " is not a function");
				}
				// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
				if(thisArg) {
					T = thisArg;
				}
				// 6. Let k be 0
				k = 0;
				// 7. Repeat, while k < len
				while(k < len) {
					var kValue;
					// a. Let Pk be ToString(k).
					//   This is implicit for LHS operands of the in operator
					// b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
					//   This step can be combined with c
					// c. If kPresent is true, then
					if(Object.prototype.hasOwnProperty.call(O, k)) {
						// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
						kValue = O[k];
						// ii. Call the Call internal method of callback with T as the this value and
						// argument list containing kValue, k, and O.
						callback.call(T, kValue, k, O);
					}
					// d. Increase k by 1.
					k++;
				}
				// 8. return undefined
			};
		}
	},
	exposeArrayContain: function () {
		if(!Array.prototype.contains) {
			Array.prototype.contains = function (value) {
				for(var p = 0; p < this.length; p++) {
					if(this[p] === value) return true;
				}
				return false;
			}
		}
	},
	isArray: function (what) {
		return Object.prototype.toString.call(what) === '[object Array]';
	},
	isObject: function (what) {
		return((typeof what == "object") && (what !== null));
	},
	isNumber: function (n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	},
	isValidDate: function (d) {
		if(Object.prototype.toString.call(d) !== "[object Date]")
			return false;
		return !isNaN(d.getTime());
	},
	isDate: function (d) {
		if(Object.prototype.toString.call(d) !== "[object Date]")
			return false;
		return !isNaN(d.getTime());
	},
	isFunction: function (obj) {
		return !!(obj && obj.constructor && obj.call && obj.apply);
	},
	toCurrency: function (num) {
		x = 0;
		if(num < 0) {
			num = Math.abs(num);
			x = 1;
		}
		if(isNaN(num)) num = "0";
		cents = Math.floor((num * 100 + 0.5) % 100);
		num = Math.floor((num * 100 + 0.5) / 100).toString();
		if(cents < 10) cents = "0" + cents;
		for(var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
			num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
		ret = num + '.' + cents;
		if(x == 1) ret = ' - ' + ret;
		return ret;
	},
	getParentByID: function (id) {
			try {
				return document.getElementById(id).parentNode;
			}
			catch(e) {
				return false;
			}
		}
		/**
		@function parseFloat - Convert currency string to a Javascript Float number
		
		@parameter currency - string or number for converting to javascript float type
			mandatory
		
		@parameter places - places after decimal, default: 2
			not mandatory
		
		@scope $dhx.parseFloat(currency, places);
	*/
		,
	parseFloat: function (currency, places) {
			(typeof places === 'undefined') ? places = 2: "";
			currency = currency.replace(",", "");
			return parseFloat(currency).toFixed(places);
		}
		/**

		@function ext -  check if the current browser is able to run AJAX applications
		
		@parameter parentClass - An Object Literal Class which will be the inherited class, OR, null
			if null, NO Parent Class will be inherited when creating your Class
			mandatory
		
		@parameter objClass - An Object Literal notation of your Class
			mandatory
		
		@parameter nameSpaceName - string value holding the namespace path where the created 
			Class will be appended as top level, OR false, OR undefined
			not mandory - default: The created object will be appended on the top level of window object
		
		@return object

	*/
		,
	ext: function (parentClass, objClass, nameSpaceName) {
			var self = this,
				ob;
			(typeof nameSpaceName === 'undefined') ? nameSpaceName = false: "";
			for(var className in objClass) {
				if(nameSpaceName) {
					var first_level = true;
					var last_level = '';
					nameSpaceName.split(".").forEach(function (level, index, array) {
						if(first_level) {
							window[level] = window[level] || {};
							//console.log(window[level]);
							//ob = window[level][className];
							last_level = window[level];
							first_level = false;
						}
						else {
							//console.log(last_level);
							last_level[level] = last_level[level] || {};
							//console.log(last_level[ level ]);
							last_level = last_level[level];
						}
					});
					//console.log(last_level);
					//console.log(className);
					((parentClass) && parentClass != null) ? last_level[className] = Object.create(parentClass): last_level[className] = {};
					ob = last_level[className];
					for(var item in objClass[className]) {
						last_level[className][item] = last_level[item] || {}
						last_level[className][item] = objClass[className][item];
						ob[item] = last_level[className][item];
					}
					//console.log(className);
					//console.log( root.NameSpace.usingNameSpace );
				}
				else {
					((parentClass) && parentClass != null) ? window[className] = Object.create(parentClass): window[className] = {};
					ob = window[className];
					for(var item in objClass[className]) {
						ob[item] = objClass[className][item];
					}
				}
			}
			return ob;
		}
		//,utils : {
		// $dhx.utils.shortcut.add(strAtalho, fnCallback);
		,
	shortcut: {
		'all_shortcuts': {},
		'add': function (shortcut_combination, callback, opt) {
			var default_options = {
				'type': 'keydown',
				'propagate': false,
				'disable_in_input': true,
				'target': document,
				'keycode': false
			}
			if(!opt) opt = default_options;
			else {
				for(var dfo in default_options) {
					if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
				}
			}
			var ele = opt.target
			if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
			var ths = this;
			shortcut_combination = shortcut_combination.toLowerCase();
			//The function to be called at keypress
			var func = function (e) {
				e = e || window.event;
				if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
					var element;
					if(e.target) element = e.target;
					else if(e.srcElement) element = e.srcElement;
					if(element.nodeType == 3) element = element.parentNode;
					if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
				}
				//Find Which key is pressed
				if(e.keyCode) code = e.keyCode;
				else if(e.which) code = e.which;
				var character = String.fromCharCode(code).toLowerCase();
				if(code == 188) character = ","; //If the user presses , when the type is onkeydown
				if(code == 190) character = "."; //If the user presses , when the type is onkeydown
				var keys = shortcut_combination.split("+");
				//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
				var kp = 0;
				//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
				var shift_nums = {
						"`": "~",
						"1": "!",
						"2": "@",
						"3": "#",
						"4": "$",
						"5": "%",
						"6": "^",
						"7": "&",
						"8": "*",
						"9": "(",
						"0": ")",
						"-": "_",
						"=": "+",
						";": ":",
						"'": "\"",
						",": "<",
						".": ">",
						"/": "?",
						"\\": "|"
					}
					//Special Keys - and their codes
				var special_keys = {
					'esc': 27,
					'escape': 27,
					'tab': 9,
					'space': 32,
					'return': 13,
					'enter': 13,
					'backspace': 8,
					'scrolllock': 145,
					'scroll_lock': 145,
					'scroll': 145,
					'capslock': 20,
					'caps_lock': 20,
					'caps': 20,
					'numlock': 144,
					'num_lock': 144,
					'num': 144,
					'pause': 19,
					'break': 19,
					'insert': 45,
					'home': 36,
					'delete': 46,
					'end': 35,
					'pageup': 33,
					'page_up': 33,
					'pu': 33,
					'pagedown': 34,
					'page_down': 34,
					'pd': 34,
					'left': 37,
					'up': 38,
					'right': 39,
					'down': 40,
					'f1': 112,
					'f2': 113,
					'f3': 114,
					'f4': 115,
					'f5': 116,
					'f6': 117,
					'f7': 118,
					'f8': 119,
					'f9': 120,
					'f10': 121,
					'f11': 122,
					'f12': 123
				}
				var modifiers = {
					shift: {
						wanted: false,
						pressed: false
					},
					ctrl: {
						wanted: false,
						pressed: false
					},
					alt: {
						wanted: false,
						pressed: false
					},
					meta: {
						wanted: false,
						pressed: false
					} //Meta is Mac specific
				};
				if(e.ctrlKey) modifiers.ctrl.pressed = true;
				if(e.shiftKey) modifiers.shift.pressed = true;
				if(e.altKey) modifiers.alt.pressed = true;
				if(e.metaKey) modifiers.meta.pressed = true;
				for(var i = 0; k = keys[i], i < keys.length; i++) {
					//Modifiers
					if(k == 'ctrl' || k == 'control') {
						kp++;
						modifiers.ctrl.wanted = true;
					}
					else if(k == 'shift') {
						kp++;
						modifiers.shift.wanted = true;
					}
					else if(k == 'alt') {
						kp++;
						modifiers.alt.wanted = true;
					}
					else if(k == 'meta') {
						kp++;
						modifiers.meta.wanted = true;
					}
					else if(k.length > 1) { //If it is a special key
						if(special_keys[k] == code) kp++;
					}
					else if(opt['keycode']) {
						if(opt['keycode'] == code) kp++;
					}
					else { //The special keys did not match
						if(character == k) kp++;
						else {
							if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
								character = shift_nums[character];
								if(character == k) kp++;
							}
						}
					}
				}
				if(kp == keys.length &&
					modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
					modifiers.shift.pressed == modifiers.shift.wanted &&
					modifiers.alt.pressed == modifiers.alt.wanted &&
					modifiers.meta.pressed == modifiers.meta.wanted) {
					callback(e);
					if(!opt['propagate']) { //Stop the event
						//e.cancelBubble is supported by IE - this will kill the bubbling process.
						e.cancelBubble = true;
						e.returnValue = false;
						//e.stopPropagation works in Firefox.
						if(e.stopPropagation) {
							e.stopPropagation();
							e.preventDefault();
						}
						return false;
					}
				}
			}
			this.all_shortcuts[shortcut_combination] = {
				'callback': func,
				'target': ele,
				'event': opt['type']
			};
			//Attach the function with the event
			if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
			else if(ele.attachEvent) ele.attachEvent('on' + opt['type'], func);
			else ele['on' + opt['type']] = func;
		},
		//Remove the shortcut - just specify the shortcut and I will remove the binding
		'remove': function (shortcut_combination) {
			shortcut_combination = shortcut_combination.toLowerCase();
			var binding = this.all_shortcuts[shortcut_combination];
			delete(this.all_shortcuts[shortcut_combination])
			if(!binding) return;
			var type = binding['event'];
			var ele = binding['target'];
			var callback = binding['callback'];
			if(ele.detachEvent) ele.detachEvent('on' + type, callback);
			else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
			else ele['on' + type] = false;
		}
	}
	//}
	,
	createShortcut: function (strAtalho, fnCallback) {
			var self = this;
			self.shortcut.add(strAtalho, fnCallback);
		}
		/**
		@object xml - provides xml manipulation
	*/
		,
	xml: {
		/**
		
		$dhx.xml.fromJSON( { menu: [
			{ item : { id: "recarregagrid", text : "reload", img : "atualizar.png", imgdis : "atualizar.png"}, child : [
				{ item : { id: "file_sep_0", text : "select all", img : "select_all.gif", imgdis : "select_all.gif"} }
			] }
			,{ item : { id: "file_sep_1", type : "separator"} }
			,{ item : { id: "selecionartodos", text : "select all", img : "select_all.gif", imgdis : "select_all.gif"} }
			,{ item : { id: "file_sep_2", type : "separator"} }
			,{ item : { id: "excluir", text : "delete selected", img : "excluir.png", imgdis : "excluir.png"} }
		
		] } )
		
		*/
		fromJSON: function (json, isRoot, parentNode, xmlDoc) {
			/** 
				@parameter json - mandatory JSON:
			*/
			var self = $dhx;
			(typeof isRoot === 'undefined') ? isRoot = true: "";
			(typeof xmlDoc === 'undefined') ? xmlDoc = null: "";
			(typeof parentNode === 'undefined') ? parentNode = false: "";
			for(var root in json) {
				var rootText;
				//create root
				if(isRoot) {
					rootText = root;
					xmlDoc = document.implementation.createDocument(null, root, null);
					isRoot = false;
				}
				// if value from key is an array, lets append childs
				if(self.isArray(json[root])) {
					for(var index = 0; index < json[root].length; index++) {
						// { item : { id: "recarregagrid", text : "reload", img : "atualizar.png", imgdis : "atualizar.png"} }
						var nodeObj = json[root][index];
						//console.log( JSON.stringify(nodeObj) );
						//if nodeObj is a object
						if(self.isObject(nodeObj)) {
							//console.log(nodeObj);
							// iterates over nodeObj object and add a new node to parent node
							var pNodeName = '';
							var pNode = '';
							for(var nodeText in nodeObj) {
								var node = null;
								if($dhx.isArray(nodeObj[nodeText])) {
									this.fromJSON(nodeObj, false, pNode, xmlDoc);
								}
								else {
									pNodeName = nodeText;
									node = xmlDoc.createElement(pNodeName);
									var attributes = nodeObj[nodeText];
									if(self.isObject(attributes)) {
										for(var attribute in attributes) {
											node.setAttribute(attribute, attributes[attribute]);
										}
									}
									(parentNode) ? parentNode.appendChild(node): xmlDoc.documentElement.appendChild(node);
									pNode = node;
								}
							}
						}
					}
				}
			}
			return xmlDoc;
		},
		serialize: function (xmlNode) {
			if(typeof window.XMLSerializer != "undefined") {
				return(new window.XMLSerializer()).serializeToString(xmlNode);
			}
			else if(typeof xmlNode.xml != "undefined") {
				return xmlNode.xml;
			}
			return "";
		}
	}
	// cookie child object
	,
	cookie: {
		set: function (cookieName, strValue, lngDays) {
			try {
				var dtmData = new Date();
				if(lngDays) {
					dtmData.setTime(dtmData.getTime() + (lngDays * 24 * 60 * 60 * 1000));
					var strExpires = "; expires=" + dtmData.toGMTString();
				}
				else {
					var strExpires = "";
				}
				document.cookie = cookieName + "=" + strValue + strExpires + "; path=/";
				return true;
			}
			catch(e) {
				//console.log(e.stack);
				return false;
			}
		},
		setByKey: function (cookieName, keyName, value, lngDays) {
			var self = $dhx.cookie;
			try {
				var thisCookies = unescape(self.get(cookieName));
				if(thisCookies) {
					thisCookies = thisCookies.split("&");
					///for(){
					thisCookies.forEach(function (cookie, index, array) {
						cookie = cookie.split("=");
						//console.log(cookie[0]);
						//console.log(cookie);
						if(cookie[0] == keyName) {
							return;
						}
					});
					var newcookie = self.get(cookieName) + "&" + keyName + "=" + value + "";
					self.set(cookieName, newcookie, lngDays);
				}
				else {
					self.set(cookieName, "" + keyName + "=" + value + "", 360);
				}
				return true;
			}
			catch(e) {
				//console.log(e.stack);
				return false;
			}
		},
		get: function (cookieName) {
			try {
				var cookieNameEqual = cookieName + "=";
				var arrCookies = document.cookie.split(';');
				for(var i = 0; i < arrCookies.length; i++) {
					var strValueCookie = arrCookies[i];
					while(strValueCookie.charAt(0) == ' ') {
						strValueCookie = strValueCookie.substring(1, strValueCookie.length);
					}
					if(strValueCookie.indexOf(cookieNameEqual) == 0) {
						return unescape(strValueCookie.substring(cookieNameEqual.length, strValueCookie.length).replace(/\+/gi, " "));
					}
				}
				return false;
			}
			catch(e) {
				return false;
			}
		},
		getByKey: function (cookiename, cookiekey) {
			var self = $dhx.cookie;
			try {
				var cookievalue = self.get(cookiename);
				if(cookievalue == "")
					return false;
				try {
					cookievaluesep = cookievalue.split("&");
				}
				catch(e) {
					return false;
				}
				for(c = 0; c < cookievaluesep.length; c++) {
					cookienamevalue = cookievaluesep[c].split("=");
					if(cookienamevalue.length > 1) //it has multi valued cookie
					{
						if(cookienamevalue[0] == cookiekey)
							return unescape(cookienamevalue[1].toString().replace(/\+/gi, " "));
					}
					else
						return false;
				}
				return false;
			}
			catch(e) {
				return false;
			}
		}
	}
	/*TITLE: Client-Side Request Object for javascript by Andrew Urquhart (UK) http://andrewu.co.uk/tools/request/manual/ VERSION: #1.41 2007-06-28 18:10 UTC*/
	,
	Request: new function () {
			//function RObj(ea) {
			var LS = "";
			var QS = new Object();
			var un = "undefined";
			var x = null; // On platforms that understand the 'undefined' keyword replace 'null' with 'undefined' for maximum ASP-like behaviour.
			var f = "function";
			var n = "number";
			var r = "string";
			var e1 = "ERROR: Index out of range in\r\nRequest.QueryString";
			var e2 = "ERROR: Wrong number of arguments or invalid property assignment\r\nRequest.QueryString";
			var e3 = "ERROR: Object doesn't support this property or method\r\nRequest.QueryString.Key";
			var dU = window.decodeURIComponent ? 1 : 0;

			function Err(arg) {
				if(ea) {
					alert("Request Object:\r\n" + arg);
				}
			}

			function URID(t) {
				var d = "";
				if(t) {
					for(var i = 0; i < t.length; ++i) {
						var c = t.charAt(i);
						d += (c == "+" ? " " : c);
					}
				}
				return(dU ? decodeURIComponent(d) : unescape(d));
			}

			function OL(o) {
				var l = 0;
				for(var i in o) {
					if(typeof o[i] != f) {
						l++;
					}
				}
				return l;
			}

			function AK(key) {
				var auk = true;
				for(var u in QS) {
					if(typeof QS[u] != f && u.toString().toLowerCase() == key.toLowerCase()) {
						auk = false;
						return u;
					}
				}
				if(auk) {
					QS[key] = new Object();
					QS[key].toString = function () {
						return TS(QS[key]);
					}
					QS[key].Count = function () {
						return OL(QS[key]);
					}
					QS[key].Count.toString = function () {
						return OL(QS[key]).toString();
					}
					QS[key].Item = function (e) {
						if(typeof e == un) {
							return QS[key];
						}
						else {
							if(typeof e == n) {
								var a = QS[key][Math.ceil(e)];
								if(typeof a == un) {
									Err(e1 + "(\"" + key + "\").Item(" + e + ")");
								}
								return a;
							}
							else {
								Err("ERROR: Expecting numeric input in\r\nRequest.QueryString(\"" + key + "\").Item(\"" + e + "\")");
							}
						}
					}
					QS[key].Item.toString = function (e) {
						if(typeof e == un) {
							return QS[key].toString();
						}
						else {

							var a = QS[key][e];
							if(typeof a == un) {
								Err(e1 + "(\"" + key + "\").Item(" + e + ")");
							}
							return a.toString();
						}
					}
					QS[key].Key = function (e) {
						var t = typeof e;
						if(t == r) {
							var a = QS[key][e];
							return(typeof a != un && a && a.toString() ? e : "");
						}
						else {
							Err(e3 + "(" + (e ? e : "") + ")");
						}
					}
					QS[key].Key.toString = function () {
						return x;
					}
				}
				return key;
			}

			function AVTK(key, val) {
				if(key != "") {
					var key = AK(key);
					var l = OL(QS[key]);
					QS[key][l + 1] = val;
				}
			}

			function TS(o) {
				var s = "";
				for(var i in o) {
					var ty = typeof o[i];
					if(ty == "object") {
						s += TS(o[i]);
					}
					else if(ty != f) {
						s += o[i] + ", ";
					}
				}
				var l = s.length;
				if(l > 1) {
					return(s.substring(0, l - 2));
				}
				return(s == "" ? x : s);
			}

			function KM(k, o) {
				var k = k.toLowerCase();
				for(var u in o) {
					if(typeof o[u] != f && u.toString().toLowerCase() == k) {
						return u;
					}
				}
			}
			if(window.location && window.location.search) {
				LS = window.location.search;
				var l = LS.length;
				if(l > 0) {
					LS = LS.substring(1, l);
					var preAmpAt = 0;
					var ampAt = -1;
					var eqAt = -1;
					var k = 0;
					var skip = false;
					for(var i = 0; i < l; ++i) {
						var c = LS.charAt(i);
						if(LS.charAt(preAmpAt) == "=" || (preAmpAt == 0 && i == 0 && c == "=")) {
							skip = true;
						}
						if(c == "=" && eqAt == -1 && !skip) {
							eqAt = i;
						}
						if(c == "&" && ampAt == -1) {
							if(eqAt != -1) {
								ampAt = i;
							}
							if(skip) {
								preAmpAt = i + 1;
							}
							skip = false;
						}
						if(ampAt > eqAt) {
							AVTK(URID(LS.substring(preAmpAt, eqAt)), URID(LS.substring(eqAt + 1, ampAt)));
							preAmpAt = ampAt + 1;
							eqAt = ampAt = -1;
							++k;
						}
					}
					if(LS.charAt(preAmpAt) != "=" && (preAmpAt != 0 || i != 0 || c != "=")) {
						if(preAmpAt != l) {
							if(eqAt != -1) {
								AVTK(URID(LS.substring(preAmpAt, eqAt)), URID(LS.substring(eqAt + 1, l)));
							}
							else if(preAmpAt != l - 1) {
								AVTK(URID(LS.substring(preAmpAt, l)), "");
							}
						}
						if(l == 1) {
							AVTK(LS.substring(0, 1), "");
						}
					}
				}
			}
			var TC = OL(QS);
			if(!TC) {
				TC = 0;
			}
			QS.toString = function () {
				return LS.toString();
			}
			QS.Count = function () {
				return(TC ? TC : 0);
			}
			QS.Count.toString = function () {
				return(TC ? TC.toString() : "0");
			}
			QS.Item = function (e) {
				if(typeof e == un) {
					return LS;
				}
				else {
					if(typeof e == n) {
						var e = Math.ceil(e);
						var c = 0;
						for(var i in QS) {
							if(typeof QS[i] != f && ++c == e) {
								return QS[i];
							}
						}
						Err(e1 + "().Item(" + e + ")");
					}
					else {
						return QS[KM(e, QS)];
					}
				}
				return x;
			}
			QS.Item.toString = function () {
				return LS.toString();
			}
			QS.Key = function (e) {
				var t = typeof e;
				if(t == n) {
					var e = Math.ceil(e);
					var c = 0;
					for(var i in QS) {
						if(typeof QS[i] != f && ++c == e) {
							return i;
						}
					}
				}
				else if(t == r) {
					var e = KM(e, QS);
					var a = QS[e];
					return(typeof a != un && a && a.toString() ? e : "");
				}
				else {
					Err(e2 + "().Key(" + (e ? e : "") + ")");
				}
				Err(e1 + "().Item(" + e + ")");
			}
			QS.Key.toString = function () {
				Err(e2 + "().Key");
			}
			this.QueryString = function (k) {
				if(typeof k == un) {
					return QS;
				}
				else {
					if(typeof k == n) {
						return QS.Item(k);
					}
					var k = KM(k, QS);
					if(typeof QS[k] == un) {
						t = new Object();
						t.Count = function () {
							return 0;
						}
						t.Count.toString = function () {
							return "0";
						}
						t.toString = function () {
							return x;
						}
						t.Item = function (e) {
							return x;
						}
						t.Item.toString = function () {
							return x;
						}
						t.Key = function (e) {
							Err(e3 + "(" + (e ? e : "") + ")");
						}
						t.Key.toString = function () {
							return x;
						}
						return t;
					}
					else {
						return QS[k];
					}
				}
			}
			this.QueryString.toString = function () {
				return LS.toString();
			}
			this.QueryString.Count = function () {
				return(TC ? TC : 0);
			}
			this.QueryString.Count.toString = function () {
				return(TC ? TC.toString() : "0");
			}
			this.QueryString.Item = function (e) {
				if(typeof e == un) {
					return LS.toString();
				}
				else {
					if(typeof e == n) {
						var e = Math.ceil(e);
						var c = 0;
						for(var i in QS) {
							if(typeof QS[i] != f && ++c == e) {
								return QS[i];
							}
						}
						Err(e1 + ".Item(" + e + ")");
					}
					else {
						return QS[KM(e, QS)];
					}
				}
				if(typeof e == n) {
					Err(e1 + ".Item(" + e + ")");
				}
				return x;
			}
			this.QueryString.Item.toString = function () {
				return LS.toString();
			}
			this.QueryString.Key = function (e) {
				var t = typeof e;
				if(t == n) {
					var e = Math.ceil(e);
					var c = 0;
					for(var i in QS) {
						if(typeof QS[i] == "object" && (++c == e)) {
							return i;
						}
					}
				}
				else if(t == r) {
					var e = KM(e, QS);
					var a = QS[e];
					return(typeof a != un && a && a.toString() ? e : "");
				}
				else {
					Err(e2 + ".Key(" + (e ? e : "") + ")");
				}
				Err(e1 + ".Item(" + e + ")");
			}
			this.QueryString.Key.toString = function () {
				Err(e2 + ".Key");
			}
			this.Version = 1.4;
			this.Author = "Andrew Urquhart (http://andrewu.co.uk)";
		} //var Request = new RObj(false);
		,
	$_GET: function (id) {
		return $dhx.Request.QueryString(id).Item(1);
	},
	forceDownload: function (fileURI, fileName) {
		var myTempWindow = window.open(fileURI, '', 'left=10000,screenX=10000');
		myTempWindow.document.execCommand('SaveAs', 'null', fileName);
		myTempWindow.close();
	},
	socket: {
		Socket: [],
		isConnected: [],
		clientID: [],
		defaultRouting_key: "welcome",
		defaultPipe: "main pipe",
		connect: function (configuration) {
			var self = $dhx.socket;
			if("WebSocket" in window) {
				configuration.pipe = configuration.pipe || self.defaultPipe;
				if(typeof self.isConnected[configuration.pipe] === 'undefined')
					self.isConnected[configuration.pipe] = false;
				if(typeof self.clientID[configuration.pipe] === 'undefined')
					self.clientID[configuration.pipe] = null;
				if(!self.isConnected[configuration.pipe]) {
					self.Socket[configuration.pipe] = new WebSocket(configuration.resource);
					self.Socket[configuration.pipe].onopen = function () {
						//console.log(arguments);
						self.isConnected[configuration.pipe] = true;
						//already subscribed to welcome routing_key via on_new_listenerss
						//self.Socket[ configuration.pipe ].Send( 'subscribed to welcome routing_key via on_new_listeners' );
						/*self.Socket[ configuration.pipe ].Send( {
							type : 'id'// message, subscribe    -> mandatory
							,message : 'subscribing'
						} );*/
						if(configuration.onOpen) configuration.onOpen(arguments);
					};
					self.Socket[configuration.pipe].onclose = function (messageEvent) {
						if(configuration.onClose) configuration.onClose();
					};
					self.Socket[configuration.pipe].onerror = function (error) {
						if(configuration.onError) configuration.onError(error);
					};
					self.Socket[configuration.pipe].onmessage = function (messageEvent) {
						//console.log( messageEvent );
						var data = JSON.parse(messageEvent.data);
						if(data) {
							if(data.type && data.type == "hippie.pipe.set_client_id") {
								if(data.client_id) {
									self.clientID[configuration.pipe] = data.client_id;
								}
							}
							else {}
							if(configuration.onMessage) configuration.onMessage(data, messageEvent);
						}
						else
						if(configuration.onMessage) configuration.onMessage({
							msg: "no data when onMessage"
						}, messageEvent);
					};
					/*self.Socket[ configuration.pipe ].Send = self.Socket[ configuration.pipe ].send;*/
					self.Socket[configuration.pipe].Send = function (m, callBack) {
							try {
								if(configuration.onBeforeSend) configuration.onBeforeSend(m);
								if($dhx.isObject(m)) {
									//console.log("im object");
									if(typeof m["message"] === 'undefined') {
										dhtmlx.message({
											type: "error",
											text: "Hey Mark, I can't send an empty message"
										});
										return;
									}
									//if(typeof m["routing_key"] === 'undefined')
									//	m["routing_key"] = self.defaultRouting_key;
									if(typeof m["type"] === 'undefined')
										m["type"] = "message";
									//console.log( m );
									//var dataObj = JSON.parse( m["data"] ) ;
									//if( typeof dataObj["type"] === 'undefined' )
									//	dataObj["type"] = m["type"];
									//m["data"] = JSON.stringify( dataObj );
									m = JSON.stringify(m);
								}
								else {
									if(m && m != null && m != "") {
										m = JSON.stringify({
											type: "message",
											message: m//,
											//routing_key: self.defaultRouting_key
										});
									}
									else {
										dhtmlx.message({
											type: "error",
											text: "Hey Mark, I can't send an empty message"
										});
										return;
									}
								}
								m = JSON.stringify({
									msg: m
								});
								//console.log( m );
								self.Socket[configuration.pipe].send(m);
								//console.log(m);
							}
							catch(e) {
								console.log(e);
							}
						}
						//self.Socket[ configuration.pipe ].Close = self.Socket[ configuration.pipe ].close;
					self.Socket[configuration.pipe].Close = function () {
						if(configuration.onBeforeClose) configuration.onBeforeClose(self.clientID[configuration.pipe]);
						self.Socket[configuration.pipe].Send({
							type: "disconnect",
							clientID: self.clientID[configuration.pipe],
							message: "client id: " + self.clientID[configuration.pipe] + " disconnected via onBeforeClose"
						});
						self.Socket[configuration.pipe].close();
					}
					self.Socket[configuration.pipe].getClientID = function () {
						return self.clientID[configuration.pipe];
					}
					window.setInterval(function () {
						//console.log( self.Socket[ configuration.pipe ].readyState )
						if(self.Socket[configuration.pipe].readyState == 0)
							if(configuration.onError) configuration.onError("The connection is not yet open.");
						if(self.Socket[configuration.pipe].readyState == 2)
							if(configuration.onError) configuration.onError("The connection is in the process of closing.");
						if(self.Socket[configuration.pipe].readyState == "3")
							if(configuration.onError) configuration.onError("The connection is closed or couldn't be opened.");
					}, 1000);
					window.onbeforeunload = function (e) {
						self.disconnectAll();
					}
				}
				return self.Socket[configuration.pipe];
			}
			else {
				return {
					send: function () {
						console.log("$dhx socket: browser not supported");
					}
				};
			}
		},
		disconnectAll: function () {
			var self = $dhx.socket;
			for(var routing_key in self.Socket) {
				self.Socket[routing_key].Close();
			}
		}
	},
	crypt: {
		/**
		 *
		 *  Secure Hash Algorithm (SHA1)
		 *  http://www.webtoolkit.info/
		 *
		 **/
		SHA1: function (msg) {
				function rotate_left(n, s) {
					var t4 = (n << s) | (n >>> (32 - s));
					return t4;
				};

				function lsb_hex(val) {
					var str = "";
					var i;
					var vh;
					var vl;
					for(i = 0; i <= 6; i += 2) {
						vh = (val >>> (i * 4 + 4)) & 0x0f;
						vl = (val >>> (i * 4)) & 0x0f;
						str += vh.toString(16) + vl.toString(16);
					}
					return str;
				};

				function cvt_hex(val) {
					var str = "";
					var i;
					var v;
					for(i = 7; i >= 0; i--) {
						v = (val >>> (i * 4)) & 0x0f;
						str += v.toString(16);
					}
					return str;
				};

				function Utf8Encode(string) {
					string = string.replace(/\r\n/g, "\n");
					var utftext = "";
					for(var n = 0; n < string.length; n++) {
						var c = string.charCodeAt(n);
						if(c < 128) {
							utftext += String.fromCharCode(c);
						}
						else if((c > 127) && (c < 2048)) {
							utftext += String.fromCharCode((c >> 6) | 192);
							utftext += String.fromCharCode((c & 63) | 128);
						}
						else {
							utftext += String.fromCharCode((c >> 12) | 224);
							utftext += String.fromCharCode(((c >> 6) & 63) | 128);
							utftext += String.fromCharCode((c & 63) | 128);
						}
					}
					return utftext;
				};
				var blockstart;
				var i, j;
				var W = new Array(80);
				var H0 = 0x67452301;
				var H1 = 0xEFCDAB89;
				var H2 = 0x98BADCFE;
				var H3 = 0x10325476;
				var H4 = 0xC3D2E1F0;
				var A, B, C, D, E;
				var temp;
				msg = Utf8Encode(msg);
				var msg_len = msg.length;
				var word_array = new Array();
				for(i = 0; i < msg_len - 3; i += 4) {
					j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
						msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
					word_array.push(j);
				}
				switch(msg_len % 4) {
				case 0:
					i = 0x080000000;
					break;
				case 1:
					i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
					break;
				case 2:
					i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
					break;
				case 3:
					i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
					break;
				}
				word_array.push(i);
				while((word_array.length % 16) != 14) word_array.push(0);
				word_array.push(msg_len >>> 29);
				word_array.push((msg_len << 3) & 0x0ffffffff);
				for(blockstart = 0; blockstart < word_array.length; blockstart += 16) {
					for(i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
					for(i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
					A = H0;
					B = H1;
					C = H2;
					D = H3;
					E = H4;
					for(i = 0; i <= 19; i++) {
						temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
						E = D;
						D = C;
						C = rotate_left(B, 30);
						B = A;
						A = temp;
					}
					for(i = 20; i <= 39; i++) {
						temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
						E = D;
						D = C;
						C = rotate_left(B, 30);
						B = A;
						A = temp;
					}
					for(i = 40; i <= 59; i++) {
						temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
						E = D;
						D = C;
						C = rotate_left(B, 30);
						B = A;
						A = temp;
					}
					for(i = 60; i <= 79; i++) {
						temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
						E = D;
						D = C;
						C = rotate_left(B, 30);
						B = A;
						A = temp;
					}
					H0 = (H0 + A) & 0x0ffffffff;
					H1 = (H1 + B) & 0x0ffffffff;
					H2 = (H2 + C) & 0x0ffffffff;
					H3 = (H3 + D) & 0x0ffffffff;
					H4 = (H4 + E) & 0x0ffffffff;
				}
				var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
				return temp.toLowerCase();
			}
			/**
			 *
			 *  Secure Hash Algorithm (SHA256)
			 *  http://www.webtoolkit.info/
			 *
			 *  Original code by Angel Marin, Paul Johnston.
			 *
			 **/
			,
		SHA2: function (s) {
			var chrsz = 8;
			var hexcase = 0;

			function safe_add(x, y) {
				var lsw = (x & 0xFFFF) + (y & 0xFFFF);
				var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
				return(msw << 16) | (lsw & 0xFFFF);
			}

			function S(X, n) {
				return(X >>> n) | (X << (32 - n));
			}

			function R(X, n) {
				return(X >>> n);
			}

			function Ch(x, y, z) {
				return((x & y) ^ ((~x) & z));
			}

			function Maj(x, y, z) {
				return((x & y) ^ (x & z) ^ (y & z));
			}

			function Sigma0256(x) {
				return(S(x, 2) ^ S(x, 13) ^ S(x, 22));
			}

			function Sigma1256(x) {
				return(S(x, 6) ^ S(x, 11) ^ S(x, 25));
			}

			function Gamma0256(x) {
				return(S(x, 7) ^ S(x, 18) ^ R(x, 3));
			}

			function Gamma1256(x) {
				return(S(x, 17) ^ S(x, 19) ^ R(x, 10));
			}

			function core_sha256(m, l) {
				var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
				var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
				var W = new Array(64);
				var a, b, c, d, e, f, g, h, i, j;
				var T1, T2;
				m[l >> 5] |= 0x80 << (24 - l % 32);
				m[((l + 64 >> 9) << 4) + 15] = l;
				for(var i = 0; i < m.length; i += 16) {
					a = HASH[0];
					b = HASH[1];
					c = HASH[2];
					d = HASH[3];
					e = HASH[4];
					f = HASH[5];
					g = HASH[6];
					h = HASH[7];
					for(var j = 0; j < 64; j++) {
						if(j < 16) W[j] = m[j + i];
						else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
						T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
						T2 = safe_add(Sigma0256(a), Maj(a, b, c));
						h = g;
						g = f;
						f = e;
						e = safe_add(d, T1);
						d = c;
						c = b;
						b = a;
						a = safe_add(T1, T2);
					}
					HASH[0] = safe_add(a, HASH[0]);
					HASH[1] = safe_add(b, HASH[1]);
					HASH[2] = safe_add(c, HASH[2]);
					HASH[3] = safe_add(d, HASH[3]);
					HASH[4] = safe_add(e, HASH[4]);
					HASH[5] = safe_add(f, HASH[5]);
					HASH[6] = safe_add(g, HASH[6]);
					HASH[7] = safe_add(h, HASH[7]);
				}
				return HASH;
			}

			function str2binb(str) {
				var bin = Array();
				var mask = (1 << chrsz) - 1;
				for(var i = 0; i < str.length * chrsz; i += chrsz) {
					bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
				}
				return bin;
			}

			function Utf8Encode(string) {
				string = string.replace(/\r\n/g, "\n");
				var utftext = "";
				for(var n = 0; n < string.length; n++) {
					var c = string.charCodeAt(n);
					if(c < 128) {
						utftext += String.fromCharCode(c);
					}
					else if((c > 127) && (c < 2048)) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					}
					else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}
				}
				return utftext;
			}

			function binb2hex(binarray) {
				var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
				var str = "";
				for(var i = 0; i < binarray.length * 4; i++) {
					str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
						hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
				}
				return str;
			}
			s = Utf8Encode(s);
			return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
		}
	},
	strip_tags: function (str, allowed_tags) {
			var key = '',
				allowed = false;
			var matches = [];
			var allowed_array = [];
			var allowed_tag = '';
			var i = 0;
			var k = '';
			var html = '';
			var replacer = function (search, replace, str) {
				return str.split(search).join(replace);
			};
			// Build allowes tags associative array
			if(allowed_tags) {
				allowed_array = allowed_tags.match(/([a-zA-Z0-9]+)/gi);
			}
			str += '';
			// Match tags
			matches = str.match(/(<\/?[\S][^>]*>)/gi);
			// Go through all HTML tags
			for(key in matches) {
				if(isNaN(key)) {
					// IE7 Hack
					continue;
				}
				// Save HTML tag
				html = matches[key].toString();
				// Is tag not in allowed list? Remove from str!
				allowed = false;
				// Go through all allowed tags
				for(k in allowed_array) { // Init
					allowed_tag = allowed_array[k];
					i = -1;
					if(i != 0) {
						i = html.toLowerCase().indexOf('<' + allowed_tag + '>');
					}
					if(i != 0) {
						i = html.toLowerCase().indexOf('<' + allowed_tag + ' ');
					}
					if(i != 0) {
						i = html.toLowerCase().indexOf('</' + allowed_tag);
					}
					// Determine
					if(i == 0) {
						allowed = true;
						break;
					}
				}
				if(!allowed) {
					str = replacer(html, "", str); // Custom replace. No regexing
				}
			}
			return str;
		}
		
		
	,dhtmlx : {
	
		/*form  validation*/
		formFields : []
		,formFields_tofill : []
		,formFields_filled : []
		
		,text_labels : {
			// validation text labels section
			validation_notEmpty : function(label)
			{
				return "The '"+ label +"' field's value can not be empty";
			}
			,validation_Empty : function(label)
			{
				return "The '"+ label +"' field's value should be empty";
			}
			,validation_ValidEmail : function(label)
			{
				return "The "+ label +" field 's value is not a valid e-mail";
			}
			,validation_ValidInteger : function(label)
			{
				return "The "+ label +" field 's should be a valid integer value";
			}
			,validation_ValidFloat : function(label)
			{
				return "The "+ label +" field 's should be a valid float value";
			}
			,validation_ValidNumeric : function(label)
			{
				return "The "+ label +" field 's value should be a valid numeric value";
			}
			,validation_ValidAplhaNumeric : function(label)
			{
				return "The "+ label +" field 's value should be a valid alpha numeric value";
			}
			,validation_ValidDatetime : function(label)
			{
				return "The "+ label +" field 's value should be a valid date time value";
			}
			,validation_ValidExpirationdate : function(label)
			{
				return "The "+ label +" field 's value should be a valid expiration date";
			}
			,validation_ValidDate : function(label)
			{
				return "The "+ label +" field 's value should be a valid date value";
			}
			,validation_ValidTime : function(label)
			{
				return "The "+ label +" field 's value should be a valid time value";
			}
			,validation_ValidCurrency : function(label)
			{
				return "The "+ label +" field 's should be a valid currency value";
			}
			,validation_ValidSSN : function(label)
			{
					return "The "+label+" field 's should be a valid social security number value";
			}
		}
		
		,prepareForm : function( uid, JSONformConfiguration, DHTMLXForm )
		{
			
			var self = $dhx.dhtmlx;
			
			self.formFields[ uid ] = []; // clean the array of formFields
			
			self.formFields_tofill[ uid ] = 0;
			
			self._setFormFieldsToBind( JSONformConfiguration.template, uid );
			
			self._setFormMasks( uid, DHTMLXForm );
			
			DHTMLXForm.attachEvent("onChange", function (id, value)
			{
				for(var x = 0; x < $dhx.dhtmlx.formFields[ uid ].length; x++)
				{
					var field = $dhx.dhtmlx.formFields[ uid ][x];
					if(field.type == "checkbox")
					{
						if(field.trigger)
						{
							if(field.name == id)
							{
								//console.log(DHTMLXForm);
								//console.log(field.trigger);
								if ( DHTMLXForm.getItemValue( field.trigger ).indexOf(value + "-,-") == -1) /* nao aberta */
								{
									var fstr = DHTMLXForm.getItemValue( field.trigger ) + value + "-,-";
									DHTMLXForm.setItemValue(field.trigger,  fstr);
								}
								else
								{
									var oldWord = value + "-,-";
									var fstr = DHTMLXForm.getItemValue( field.trigger ).replace(new RegExp(oldWord,"g"), "");
									DHTMLXForm.setItemValue(field.trigger,  fstr);
								}
							}
						}
					}
				}
			});	
		}
		
		,_setFormFieldsToBind : function (json, uid, appended_on_the_fly)
		{
			var self = $dhx.dhtmlx;
			// iterates over all items of the form's JSON
			//console.log(json.length);
			//console.log(json);
			try
			{
				for(var x=0; x < json.length; x++)
				{
					json[x] = json[x] || {};
					
					var formField = json[x];
					//console.log(formField);
					// catch the type of the item
					
					try
					{
						formField.type = formField.type || "button";
						
					}
					catch(e)
					{
						//console.log('formField.type = formField.type || "button" : ' + e.message);
						//console.log(formField);
					}
					
					var type = formField.type;
					
					//var type = formField.type || "";
					//console.log(type);
					// if the item has one of each following type, we'll discard it
					if(type == "newcolumn" || type == "settings" || type == "button")
					{
						continue; // discard the item
					}
					
					try
					{
						if(typeof self.formFields[ uid ] === 'undefined')
						{
							self.formFields[ uid ] = [];	
						}
					}
					catch(e)
					{
						//console.log("if(! self.formFields[ uid ]) === " + e.message);
					}
					
					// if the item has a "block" type, we need to catch the items inside of the list property of the block
					if(type == "block")
					{
						if(appended_on_the_fly)
						{
							self._setFormFieldsToBind( formField.list, uid, true ); // use this same function to catch the items inside of the list
						}
						else
						{
							self._setFormFieldsToBind( formField.list, uid ); // use this same function to catch the items inside of the list
						}
						
					}
					else if(type == "label" && formField.list )
					{
						//if(formField.list)
						//{
							if(appended_on_the_fly)
							{
								self._setFormFieldsToBind( formField.list, uid, true ); // use this same function to catch the items inside of the list
							}
							else
							{
								self._setFormFieldsToBind( formField.list, uid ); // use this same function to catch the items inside of the list
							}
							
							
						//}
					}
					else if(type == "checkbox" && formField.list )
					{
						//if(formField.list)
						//{
							if(appended_on_the_fly)
							{
								self.formFields[ uid ].unshift( formField );
								self.formFields_tofill[uid] = self.formFields_tofill[uid] + 1;
								self._setFormFieldsToBind( formField.list, uid, true ); // use this same function to catch the items inside of the list
							}
							else
							{
								self.formFields[ uid ].push( formField );
								self.formFields_tofill[uid] = self.formFields_tofill[uid] + 1;
								self._setFormFieldsToBind( formField.list, uid ); // use this same function to catch the items inside of the list
							}
						//}
					}
					else if(type == "fieldset" && formField.list )
					{
						//if(formField.list)
						//{
							if(appended_on_the_fly)
							{
								self._setFormFieldsToBind( formField.list, uid, true ); // use this same function to catch the items inside of the list
							}
							else
							{
								self._setFormFieldsToBind( formField.list, uid ); // use this same function to catch the items inside of the list
							}
							//console.log(" fieldset ");
						//}
					}
					// if not, we push the formfield into the self.formFields[ uid ] array
					else
					{
						if(appended_on_the_fly)
						{
							self.formFields[ uid ].unshift( formField );
							//console.log("unshift")
						}
						else
						{
							self.formFields[ uid ].push( formField );
							//console.log("push")
						}
						
						self.formFields_tofill[uid] = self.formFields_tofill[uid] + 1;
					}
				}
			}
			catch(e)
			{
				//console.log("_setFormFieldsToBind method " + e.message);
			}
			
			
			
		}
		
		,_setFormMasks : function ( uid, DHTMLXForm )
		{
			var self = $dhx.dhtmlx;
			
			//console.log(self.formFields[ uid ]);
			
			for(var x = 0; x < self.formFields[ uid ].length; x++)
			{
				var field = self.formFields[ uid ][x];
				
				// check if the item has a name. Lets assume that all the fields which should be validate has a name
				if(field.name)
				{
					
					var mask_to_use, name, type, id = null;
					
					mask_to_use = field.mask_to_use || "";
					
					//console.log(mask_to_use);
					
					if(typeof field.type === 'undefined')
					{
						field.type = "";	
					}
					
					type = field.type || "";
					
					name = field.name || "";
					
					
					if( type != "input" )
					{
						continue;	
					}
					
					//console.log(name);
					
					
					//formFields_filled
					
					if(mask_to_use == "currency")
					{
						try
						{
							id = DHTMLXForm.getInput(name).id;
						}catch(e)
						{
							id = DHTMLXForm.getInput(name).getAttribute("id");
						}
						$("#" + id).priceFormat({ prefix: '' });
						
					}
					
					else if(mask_to_use == "can_currency")
					{
						try
						{
							id = DHTMLXForm.getInput(name).id;
						}catch(e)
						{
							id = DHTMLXForm.getInput(name).getAttribute("id");
						}
						$("#" + id).priceFormat({ prefix: 'CAN ' });
					}
					
					else if(mask_to_use == "integer")
					{
						DHTMLXForm.getInput(name).onkeydown = function(event){
							 only_integer( this );
						};
					}
					
					else if(mask_to_use == "us_phone")
					{
						DHTMLXForm.getInput(name).onkeypress = function(event){
							 phone_mask( this );
						};
						DHTMLXForm.getInput(name).maxLength = "13";
					}
					
					else if(mask_to_use == "expiration_date")
					{
						DHTMLXForm.getInput(name).onkeypress = function(event){
							 expiration_date( this );
						};
						DHTMLXForm.getInput(name).maxLength = "5";
					}
					
					else if(mask_to_use == "cvv")
					{
						DHTMLXForm.getInput(name).onkeydown = function(event){
							 only_integer( this );
						};
						DHTMLXForm.getInput(name).maxLength = "4";
					}
					
					else if(mask_to_use == "credit_card")
					{
						DHTMLXForm.getInput(name).onkeydown = function(event){
							 only_integer( this );
						};
						DHTMLXForm.getInput(name).maxLength = "16";
					}
						
					else if(mask_to_use == "time")
					{
						//console.log("time mask")
						DHTMLXForm.getInput(name).onkeydown = function(event){
							 time_mask( this, event );
						};
						DHTMLXForm.getInput(name).maxLength = "8";
					}
					
					else if(mask_to_use == "SSN")
					{
						DHTMLXForm.getInput(name).onkeypress = function(event){
							 ssn_mask( this );
						};
						DHTMLXForm.getInput(name).maxLength = "11";
					}
					
					
					
								
				}// END - check if the item has a name. 
			
			}// END FOR
		}
		
		,getFormItem : function( name, uid )
		{
			var self = $dhx.dhtmlx;
			
			if(self.formFields[ uid ] === undefined)
			{
				return false;
			}
			
			for(var x = 0; x < self.formFields[ uid ].length; x++)
			{
				var field = self.formFields[ uid ][x];
				if(field.name  == name)
				{
					return field;	
				}
			}
			return false;
		}
		
		,getFormDataAsPayload : function( uid, DHTMLXForm )
		{
			var self = $dhx.dhtmlx, hash = DHTMLXForm.getFormData(), payload = "";
		
			for(var formfield in hash)
			{
				payload = payload + formfield + "=" + encodeURIComponent( hash[formfield] ) + "&";
			}
			
			if ( payload == "" )
				return null;
			
			if ( payload.charAt( payload.length - 1 ) == '&' )
				payload = payload.substr(0, payload.length - 1);
			
			return payload;
		}
		
		,validateForm : function( uid, DHTMLXForm )
		{
			var self = $dhx.dhtmlx, hash;
			hash = DHTMLXForm.getFormData();
			for(var fieldname in hash)
			{
				if (hash.hasOwnProperty(fieldname))
				{
					//console.log(DHTMLXForm.getForm())
					// check if the item has a name. Lets assume that all the fields which should be validate has a name
					
					var field = self.getFormItem( fieldname, uid );
					
					if(! field )
					{
						continue;	
					}
					
					if(field.name)
					{
						//console.log(field.name);
						var name, type, value, validate, label;
						name = field.name;
						type = field.type || "";
						label = field.label || "";
						try
						{
							value = DHTMLXForm.getInput(fieldname).value;
						}
						catch(e)
						{
							value = hash[fieldname] || "";
						}
						
						validate = field.validate || "";		
						//console.log(validate);
						//==== DO the validations 
						// if the value is not valid, the function will returns, terminating the execution		
						//==== NotEmpty validation
						var NotEmpty = validate.toString().match("NotEmpty");
						if( NotEmpty == "NotEmpty" )
						{
							// if the value have not a lenght > 0
							if(value.toString().length < 1)
							{				
								self._setInputHighlighted( field, uid, DHTMLXForm );
								dhtmlx.message( {type : "error", text : self.text_labels.validation_notEmpty(label) } ); // 
								return;	
							}
						}
						
						var Empty = validate.toString().match("Empty");
						if( Empty == "Empty" && NotEmpty != "NotEmpty" )
						{
							// if the value have not a lenght > 0
							if( value.toString().length > 0 )
							{				
								self._setInputHighlighted( field, uid, DHTMLXForm );
								dhtmlx.message( {type : "error", text : self.text_labels.validation_Empty(label)} );
								return;	
							}
						}
						
						var ValidEmail = validate.toString().match("ValidEmail");
						if( ValidEmail == "ValidEmail" )
						{
							// if the value have not a lenght > 0
							if (value.length > 0)
							{
								if (!/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(value))
								{
									self._setInputHighlighted( field, uid, DHTMLXForm );
									dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidEmail(label)} );
									return;	
								}
							}
						}
						
						var ValidInteger = validate.toString().match("ValidInteger");
						if( ValidInteger == "ValidInteger" )
						{
							// if the value have not a lenght > 0
							if (value.length > 0)
							{
								if (! value.match(/^\d+$/))
								{
									self._setInputHighlighted( field, uid, DHTMLXForm );
									dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidInteger(label)} );
									return;	
								}
							}
						}
						
						var ValidFloat = validate.toString().match("ValidFloat");
						if( ValidFloat == "ValidFloat" )
						{
							// if the value have not a lenght > 0
							if (value.length > 0)
							{
								if (! value.match(/^\d+\.\d+$/))
								{
									self._setInputHighlighted( field, uid, DHTMLXForm );
									dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidFloat(label)} );
									return;	
								}
							}
						}
						
						var ValidNumeric = validate.toString().match("ValidNumeric");
						if( ValidNumeric == "ValidNumeric" )
						{
							// if the value have not a lenght > 0
							if(value.length > 0)
							{
								if( isNaN( value ) )
								{
									self._setInputHighlighted( field, uid, DHTMLXForm );
									dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidNumeric(label)} );
									return;	
								}
							}
						}
						
						var ValidAplhaNumeric = validate.toString().match("ValidAplhaNumeric");
						if( ValidAplhaNumeric == "ValidAplhaNumeric" )
						{
							// if the value have not a lenght > 0
							if(value.length > 0)
							{
								if( ! value.match(/^[0-9a-z]+$/) )
								{
									self._setInputHighlighted( field, uid, DHTMLXForm );
									dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidAplhaNumeric(label)} );
									return;	
								}
							}
						}
						
						var ValidDatetime = validate.toString().match("ValidDatetime");
						if( ValidDatetime == "ValidDatetime" )
						{
							// if the value have not a lenght > 0
							if(value.length > 0)
							{					
								if( isNaN( Date.parse(value)) )
								{
									self._setInputHighlighted( field, uid, DHTMLXForm );
									dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidDatetime(label)} );
									return;	
								}
							}
						}
						
						var ValidDate = validate.toString().match("ValidDate");
						if( ValidDate == "ValidDate" )
						{
							// if the value have not a lenght > 0
							if(value.length > 0)
							{					
								if( isNaN( Date.parse(value)) )
								{
									self._setInputHighlighted( field, uid, DHTMLXForm );
									dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidDate(label)} );
									return;	
								}
							}
						}
						
						var ValidTime = validate.toString().match("ValidTime");
						if( ValidTime == "ValidTime" )
						{
							// if the value have not a lenght > 0
							if(value.length > 0)
							{					
								var matchArray = value.match(/^(\d{1,2}):(\d{2})(:(\d{2}))?(\s?(AM|am|PM|pm))?$/);
								if (matchArray == null)
								{
									self._setInputHighlighted( field, uid, DHTMLXForm );
									dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidTime(label)} );
									return;	
								}
								
								if( value.toString().toLowerCase().match("am") == "am" || value.toString().toLowerCase().match("pm") == "pm" )
								{
									if(value.split(":")[0] > 12 || (value.split(":")[1]).split(" ")[0] > 59)
									{
										self._setInputHighlighted( field, uid, DHTMLXForm );
										dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidTime(label)} );
										return;	
									}
								}
								else
								{
									if(value.split(":")[0] > 23 || value.split(":")[1] > 59)
									{
										self._setInputHighlighted( field, uid, DHTMLXForm );
										dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidTime(label)} );
										return;	
									}	
								}
								
							}
						}
						
						var ValidCurrency = validate.toString().match("ValidCurrency");
						if( ValidCurrency == "ValidCurrency" )
						{
							// if the value have not a lenght > 0
							if (value.length > 0)
							{
								if ( ! /^\d+(?:\.\d{0,2})$/.test( value ) )
								{
									self._setInputHighlighted( field, uid, DHTMLXForm );
									dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidCurrency(label)} );
									return;	
								}
							}
						}
						
						var ValidSSN = validate.toString().match("ValidSSN");
						if( ValidSSN == "ValidSSN" )
						{
							// if the value have not a lenght > 0
							if (value.length > 0)
							{
								if ( ! value.match(/^\d{3}-\d{2}-\d{4}$/) )
								{
									self._setInputHighlighted( field, uid, DHTMLXForm );
									dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidSSN(label)} );
									return;	
								}
							}
						}
						
						
						var ValidExpirationdate = validate.toString().match("ValidExpirationdate");
						if( ValidExpirationdate == "ValidExpirationdate" )
						{
							// if the value have not a lenght > 0  00/00
							if (value.length > 0)
							{
	
								if(value.length != 5)
								{					
									self._setInputHighlighted( field, uid, DHTMLXForm );
									dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidExpirationdate(label)} );
									return;	
								}
								else
								{
									var month = value.split("/")[0];
									var year = value.split("/")[1];
									
									if( isNaN( month ) || isNaN( year ) )
									{
										self._setInputHighlighted( field, uid, DHTMLXForm );
										dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidExpirationdate(label)} );
										return;	
									}
									
									if(! (month > 0 && month < 13 ) )
									{
										self._setInputHighlighted( field, uid, DHTMLXForm );
										dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidExpirationdate(label)} );
										return;	
									}
									
									if(! (year > 0 && year < 99 ) )

									{
										self._setInputHighlighted( field, uid, DHTMLXForm );
										dhtmlx.message( {type : "error", text : self.text_labels.validation_ValidExpirationdate(label)} );
										return;	
									}
								}
							}
						}
						
					
					}// end if have name
				}
				
				
			}// end for
			return true;
		}
		
		,_setInputInvalid : function (objInput)
		{
			objInput.style.backgroundColor = "#fdafa3";
			
			objInput.focus();
			
			objInput.onclick = function()
			{
				objInput.style.backgroundColor = "#fff";
			}
			objInput.onchange = function()
			{
				objInput.style.backgroundColor = "#fff";
			}
			objInput.onkeydown = function()
			{
				objInput.style.backgroundColor = "#fff";
			}
		}
		
		,_setInputHighlighted : function ( field, uid, DHTMLXForm )
		{
			//console.log( self.form[ uid ].getForm() )
			var self = $dhx.dhtmlx;
			
			var name = field.name;
			var type = field.type;
			
			//var associated_label = field.associated_label || false;
			// these if / else is just for highlightning the formfield which should be filled
			if(type == "combo")
			{
				var fcombo = DHTMLXForm.getCombo( name );
				fcombo.openSelect();
			}
			else if(type == "editor")
			{
				//var feditor = DHTMLXForm.getEditor(name);
			}
			else if(type == "multiselect")
			{
				var finput = DHTMLXForm.getSelect( name );
				self._setInputInvalid( finput, uid );
			}
			else if(type == "select")
			{
				self._setInputInvalid( DHTMLXForm.getInput(name), uid );
			}
			else
			{
				self._setInputInvalid( DHTMLXForm.getInput(name) );
			}
		}	
		
	}
		
		
		/**
		@function init -  performs all the necessary tasks before let the user to use the $dhx object
	*/
		,
	init: function (c) {
		var self = this;
		self.checkBrowserStuff(); // mandatory, first
		self.exposeForEach();
		self.exposeArrayContain();
		if(typeof c !== 'undefined') {
			if(c.plugins) {}
		}
	}
};
window.onload = function () {
	$dhx.init();
};