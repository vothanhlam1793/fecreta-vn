<!-- Trong file trang.vue hoặc tương tự -->

<template>
    <div
        class="xzoom-container"
        v-if="showImage"
    >
        <img
            class="xzoom"
            id="xzoom-default"
            :src="images.data[0] ? urlBackend + images.data[0].attributes.url : ''"
            :xoriginal="images.data[0] ? urlBackend + images.data[0].attributes.url : ''"
        />
        <div class="xzoom-thumbs"></div>
        <a
            v-for="image in images.data"
            :key="image.id"
            :href="urlBackend + image.attributes.url">
            <img
                class="xzoom-gallery"
                :src="urlBackend + image.attributes.url"
                :xpreview="urlBackend + image.attributes.url"
                title="Cảm ơn quý khách"
            >
        </a>
    </div>
    <div v-else>
        <b-spinner label="Loading..."></b-spinner>
    </div>
</template>

<script>
export default {
    props: ['images', 'urlBackend'],
    head() {
        return {
            link: [
                { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }
            ],
            script: [
                { src: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js' },
                { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js' },
            ]
        }
    },
    data() {
        return {
            showImage: false,
        }
    },
    mounted() {
        this.addScripts();
    },
    methods: {
        addScripts() {
            // Tạo các thẻ script và thêm vào sau thẻ body
            const script1 = document.createElement('script');
            script1.src = 'https://code.jquery.com/jquery-2.1.1.js';

            const script2 = document.createElement('script');
            script2.src = 'https://unpkg.com/xzoom/dist/xzoom.min.js';

            const script3 = document.createElement('script');
            script3.src = 'https://hammerjs.github.io/dist/hammer.min.js';

            const script4 = document.createElement('script');
            script4.src = 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/js/foundation.min.js';

            document.body.appendChild(script1);
            document.body.appendChild(script2);
            document.body.appendChild(script3);
            document.body.appendChild(script4);
            var that = this;
            script2.onload = () => {
                that.scriptRunning();
            };
        },
        scriptRunning() {
            var that = this;
            // console.log("HERE 1");
            (function ($) {
                // console.log("HERE 2");
                $(document).ready(function () {
                    $('.xzoom, .xzoom-gallery').xzoom({ zoomWidth: 400, title: true, tint: '#333', Xoffset: 15 });
                    $('.xzoom2, .xzoom-gallery2').xzoom({ position: '#xzoom2-id', tint: '#ffa200' });
                    $('.xzoom3, .xzoom-gallery3').xzoom({ position: 'lens', lensShape: 'circle', sourceClass: 'xzoom-hidden' });
                    $('.xzoom4, .xzoom-gallery4').xzoom({ tint: '#006699', Xoffset: 15 });
                    $('.xzoom5, .xzoom-gallery5').xzoom({ tint: '#006699', Xoffset: 15 });

                    //Integration with hammer.js
                    var isTouchSupported = 'ontouchstart' in window;

                    if (isTouchSupported) {
                        //If touch device
                        $('.xzoom, .xzoom2, .xzoom3, .xzoom4, .xzoom5').each(function () {
                            var xzoom = $(this).data('xzoom');
                            xzoom.eventunbind();
                        });

                        $('.xzoom, .xzoom2, .xzoom3').each(function () {
                            var xzoom = $(this).data('xzoom');
                            $(this).hammer().on("tap", function (event) {
                                event.pageX = event.gesture.center.pageX;
                                event.pageY = event.gesture.center.pageY;
                                var s = 1, ls;

                                xzoom.eventmove = function (element) {
                                    element.hammer().on('drag', function (event) {
                                        event.pageX = event.gesture.center.pageX;
                                        event.pageY = event.gesture.center.pageY;
                                        xzoom.movezoom(event);
                                        event.gesture.preventDefault();
                                    });
                                }

                                xzoom.eventleave = function (element) {
                                    element.hammer().on('tap', function (event) {
                                        xzoom.closezoom();
                                    });
                                }
                                xzoom.openzoom(event);
                            });
                        });

                        $('.xzoom4').each(function () {
                            var xzoom = $(this).data('xzoom');
                            $(this).hammer().on("tap", function (event) {
                                event.pageX = event.gesture.center.pageX;
                                event.pageY = event.gesture.center.pageY;
                                var s = 1, ls;

                                xzoom.eventmove = function (element) {
                                    element.hammer().on('drag', function (event) {
                                        event.pageX = event.gesture.center.pageX;
                                        event.pageY = event.gesture.center.pageY;
                                        xzoom.movezoom(event);
                                        event.gesture.preventDefault();
                                    });
                                }

                                var counter = 0;
                                xzoom.eventclick = function (element) {
                                    element.hammer().on('tap', function () {
                                        counter++;
                                        if (counter == 1) setTimeout(openfancy, 300);
                                        event.gesture.preventDefault();
                                    });
                                }

                                function openfancy() {
                                    if (counter == 2) {
                                        xzoom.closezoom();
                                        $.fancybox.open(xzoom.gallery().cgallery);
                                    } else {
                                        xzoom.closezoom();
                                    }
                                    counter = 0;
                                }
                                xzoom.openzoom(event);
                            });
                        });

                        $('.xzoom5').each(function () {
                            var xzoom = $(this).data('xzoom');
                            $(this).hammer().on("tap", function (event) {
                                event.pageX = event.gesture.center.pageX;
                                event.pageY = event.gesture.center.pageY;
                                var s = 1, ls;

                                xzoom.eventmove = function (element) {
                                    element.hammer().on('drag', function (event) {
                                        event.pageX = event.gesture.center.pageX;
                                        event.pageY = event.gesture.center.pageY;
                                        xzoom.movezoom(event);
                                        event.gesture.preventDefault();
                                    });
                                }

                                var counter = 0;
                                xzoom.eventclick = function (element) {
                                    element.hammer().on('tap', function () {
                                        counter++;
                                        if (counter == 1) setTimeout(openmagnific, 300);
                                        event.gesture.preventDefault();
                                    });
                                }

                                function openmagnific() {
                                    if (counter == 2) {
                                        xzoom.closezoom();
                                        var gallery = xzoom.gallery().cgallery;
                                        var i, images = new Array();
                                        for (i in gallery) {
                                            images[i] = { src: gallery[i] };
                                        }
                                        $.magnificPopup.open({ items: images, type: 'image', gallery: { enabled: true } });
                                    } else {
                                        xzoom.closezoom();
                                    }
                                    counter = 0;
                                }
                                xzoom.openzoom(event);
                            });
                        });

                    } else {
                        //If not touch device

                        //Integration with fancybox plugin
                        $('#xzoom-fancy').bind('click', function (event) {
                            var xzoom = $(this).data('xzoom');
                            xzoom.closezoom();
                            $.fancybox.open(xzoom.gallery().cgallery, { padding: 0, helpers: { overlay: { locked: false } } });
                            event.preventDefault();
                        });

                        //Integration with magnific popup plugin
                        $('#xzoom-magnific').bind('click', function (event) {
                            var xzoom = $(this).data('xzoom');
                            xzoom.closezoom();
                            var gallery = xzoom.gallery().cgallery;
                            var i, images = new Array();
                            for (i in gallery) {
                                images[i] = { src: gallery[i] };
                            }
                            $.magnificPopup.open({ items: images, type: 'image', gallery: { enabled: true } });
                            event.preventDefault();
                        });
                    }
                });
                that.showImage = true;
            })(jQuery);
        }
    },
};
</script>

<style>
/* Compatibility styles for frameworks like bootstrap, foundation e.t.c */
.xzoom-source img,
.xzoom-preview img,
.xzoom-lens img {
    display: block;
    max-width: none;
    max-height: none;
    -webkit-transition: none;
    -moz-transition: none;
    -o-transition: none;
    transition: none;
}

/* --------------- */

/* xZoom Styles below */
.xzoom-container {
    display: inline-block;
}

.xzoom-thumbs {
    text-align: center;
    margin-bottom: 10px;
}

.xzoom {
    width: 400px;
    height: 400px;
    object-fit: contain;
    max-width: 400px;
    max-height: 400px;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
}

.xzoom2,
.xzoom3,
.xzoom4,
.xzoom5 {
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
}

/* Thumbs */
.xzoom-gallery,
.xzoom-gallery2,
.xzoom-gallery3,
.xzoom-gallery4,
.xzoom-gallery5 {
    border: 1px solid #cecece;
    margin-left: 5px;
    margin-bottom: 10px;
    width: 80px;
    height: 80px;
    object-fit: contain;
}

.xzoom-source,
.xzoom-hidden {
    display: block;
    position: static;
    float: none;
    clear: both;
}

/* Everything out of border is hidden */
.xzoom-hidden {
    overflow: hidden;
}

/* Preview */
.xzoom-preview {
    border: 1px solid #888;
    background: #2f4f4f;
    box-shadow: -0px -0px 10px rgba(0, 0, 0, 0.50);
}

/* Lens */
.xzoom-lens {
    border: 1px solid #555;
    box-shadow: -0px -0px 10px rgba(0, 0, 0, 0.50);
    cursor: crosshair;
}

/* Loading */
.xzoom-loading {
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 100%;
    opacity: .7;
    background: url(https://s.bootsnipp.com/images/xloading.gif);
    width: 48px;
    height: 48px;
}

/* Additional class that applied to thumb when it is active */
.xactive {
    -webkit-box-shadow: 0px 0px 3px 0px rgba(74, 169, 210, 1);
    -moz-box-shadow: 0px 0px 3px 0px rgba(74, 169, 210, 1);
    box-shadow: 0px 0px 3px 0px rgba(74, 169, 210, 1);
    border: 1px solid #4aaad2;
}

/* Caption */
.xzoom-caption {
    position: absolute;
    bottom: -43px;
    left: 0;
    background: #000;
    width: 100%;
    text-align: left;
}

.xzoom-caption span {
    color: #fff;
    font-family: Arial, sans-serif;
    display: block;
    font-size: 0.75em;
    font-weight: bold;
    padding: 10px;
}
</style>