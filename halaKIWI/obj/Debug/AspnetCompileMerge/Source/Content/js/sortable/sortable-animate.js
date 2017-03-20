// JavaScript Document
/* ===================================================
 *  jquery-sortable.js v0.9.11
 *  http://johnny.github.com/jquery-sortable/
 * ===================================================
 *  Copyright (c) 2012 Jonas von Andrian  Edited by : vel(04-10-13)
 * ========================================================== */
$(function () {
    var adjustment;

    $("ul.animate-sort").sortable({
        group: 'animate-sort',
        pullPlaceholder: false,
        // animation on drop
        onDrop: function (item, targetContainer, _super) {
            
            var clonedItem = $('<li/>').css({ height: 0 })
            alert(clonedItem);
            item.before(clonedItem)
            clonedItem.animate({ 'height': item.height() }, "fast")

            item.animate(clonedItem.position(), function () {
                clonedItem.detach()
                _super(item)
            })
        },

        // set item relative to cursor position
        onDragStart: function ($item, container, _super) {
            var offset = $item.offset(),
            pointer = container.rootGroup.pointer

            adjustment = {
                left: pointer.left - offset.left,
                top: pointer.top - offset.top
            }

            _super($item, container)
        },
        onDrag: function ($item, position) {
            $item.css({
                left: position.left - adjustment.left,
                top: position.top - adjustment.top
            })
        }
    })
})
