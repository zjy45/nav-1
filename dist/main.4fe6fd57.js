// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var siteListCache = JSON.parse(localStorage.getItem('siteList'));
var siteHash = siteListCache || [{
    icon: 'A',
    url: 'https://www.acfun.cn/',
    desc: 'A站'
}, {
    icon: 'B',
    url: 'https://www.bilibili.com/',
    desc: 'B站'
}];

var icon_from_url = function icon_from_url(url) {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')[0];
};

$('.searchButton').on('click', function () {
    var $input = $('.searchInput').val();
    window.open('https://www.google.com/search?q=' + $input, '_self');
});

var siteUnit = function siteUnit(url, icon, desc) {
    return '<div class="site" id=' + Date.parse(new Date()) + '>\n        <div class="link">' + url + '</div>\n        <div class="close">X</div>\n        <div class="siteIcon">\n            ' + icon + '\n        </div>\n        <div class="desc">\n            ' + desc + '\n        </div>\n    </div>';
};

var render = function render() {
    $add = $('.addSite');
    siteHash.forEach(function (node, index) {
        $add.before(siteUnit(node.url, node.icon, node.desc));
    });
};

$('.siteList').on('click', function (e) {
    if ($(e.target).hasClass('close')) {
        var $site = $(e.target).closest('.site');
        var index = $(".siteList .site").index($site);
        siteHash.splice(index, 1);
        $site.remove();
    } else if ($(e.target).closest('.site')) {
        var url = $(e.target).closest('.site').find('.link').text();
        window.open(url, '_self');
    }
});

var modal = $('.modal');
var mask = $('.mask');

$('.addSite').on('click', function (event) {
    mask.removeClass('modalClose');
});

$('.addButton').on('click', function (event) {
    var url = $('.modalUrl').val();
    var desc = $('.modalDesc').val();
    if (url === '' || desc === '') {
        return window.alert('请填写完整网址和描述');
    }
    siteHash.push({
        'icon': icon_from_url(url),
        'url': url,
        'desc': desc
    });
    $add.before(siteUnit(url, icon_from_url(url), desc));
    $('.modalUrl').val('');
    $('.modalDesc').val('');
    mask.addClass('modalClose');
});

mask.on('click', function (event) {
    mask.addClass('modalClose');
    $('.modalUrl').val('');
    $('.modalDesc').val('');
});

modal.on('click', function (e) {
    e.stopPropagation();
});

render();

window.onbeforeunload = function () {
    localStorage.setItem('siteList', JSON.stringify(siteHash));
};

// $(document).on('keypress', (e) => {
//     const {key} = e
//     for (let i = 0; i < siteHash.length; i++) {
//         if (siteHash[i].icon.toLowerCase() === key) {
//             window.open(siteHash[i].url, '_self')
//         }
//     }
// })
},{}]},{},["epB2"], null)
//# sourceMappingURL=/main.4fe6fd57.map