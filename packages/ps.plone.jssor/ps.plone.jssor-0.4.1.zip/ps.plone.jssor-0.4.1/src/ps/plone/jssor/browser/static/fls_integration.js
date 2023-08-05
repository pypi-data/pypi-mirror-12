/*
* Integration / Improvements for propertyshelfs FeaturedListingSlider 
*/

function resize2pixel(element, mode){
    /* check the width of the given element and set it explicit as static px
     *  mode = width (reset the width of element in px)
     *         height (resize the height of element)
     *         default (resize width& height of the element in px)
    */
    switch(mode){
        case 'width':
            $(element).width($(element).width());
            break;
        case 'height':
            $(element).height($(element).height());
            break;
        default:
        // re-set width & height
            $(element).width($(element).width());
            $(element).height($(element).height());
            break;
    }

}

function PSScaleSlider(obj, parent) {
    //reset to 100% width of parent container
    $(parent).css('width', '100%');
    $(parent).css('height', 'auto');
    var parentWidth = $(parent).width();
    if (parentWidth) {
        obj.$ScaleWidth(parentWidth);
    }
}