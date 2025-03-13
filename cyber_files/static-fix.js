/* Added fixes to fix 2055833 as part of translations 11/27/2024 Kartheek*/
(() => {
	
// 2163690: Social Share v2 | Social links not linking (all sites, all templates)
	window.windowOptions = '';
	  
	  
  window.onload = function () {
    // Task 2055833 - Updating the text of the promo component to a proper translated text
    //$(".cmp-promo--featured-primary .cmp-promo__content .cmp-promo__content__type:contains('Dienst')").html("Service");
    // BUG - 1554137 - Modal bootstrap fragment backward compatibility
    function replaceDataAttribute(element, oldAttr, newAttr) {
      if (element.attr(oldAttr)) {
        const currentValue = element.attr(oldAttr);
        element.attr(newAttr, currentValue);
        element.removeAttr(oldAttr);
      }
    }

    function replaceModalDataAttributes() {
      const elementsWithDataAttributes = $(
        "[data-target],[data-toggle],[data-dismiss]"
      );

      elementsWithDataAttributes.each(function () {
        var modalAttr = $(this).attr("data-toggle");
        // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
        if (typeof modalAttr !== typeof undefined && modalAttr !== false) {
          replaceDataAttribute($(this), "data-target", "data-bs-target");
          replaceDataAttribute($(this), "data-toggle", "data-bs-toggle");
        }
        replaceDataAttribute($(this), "data-dismiss", "data-bs-dismiss");
      });
    }
    replaceModalDataAttributes();

    $(document).on("show.bs.modal", function () {
      setTimeout(() => {
        $(".modal.fade.show").addClass("in");
      }, 100);
    });

    $(document).on("shown.bs.modal", function () {
      $(".modal-backdrop.fade.show").addClass("in");
    });

    $(document).on("hide.bs.modal", function () {
      $(".modal.fade.show").removeClass("in");
    });
    // Bug - 1554137 fix ends here
  };
})();

// 2163690: Social Share v2 | Social links not linking (all sites, all templates)
// social share clientlibs are not loading in the restricted custom template
// we need the global method launchShare defined there to be available in the restricted custom template
 
(() => {
  if(document.head.querySelector("[name~=template][content]").content === 'modern--restricted-custom-template') {
        const scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.src = '/etc.clientlibs/modern/clientlibs/clientlib-components/social-share.min.js';
        document.getElementsByTagName('head')[0].appendChild(scriptTag);
  }
})();
 
