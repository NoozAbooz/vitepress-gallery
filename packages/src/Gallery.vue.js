/// <reference types="C:/Users/Michael/Documents/GitHub/vitepress-gallery/packages/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/Michael/Documents/GitHub/vitepress-gallery/packages/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed, onMounted, onUnmounted } from 'vue';
const props = defineProps();
const currentIndex = ref(0);
const direction = ref('fade');
const isMobile = ref(false);
let touchStartX = 0;
function parseImageEntry(entry, index) {
    const raw = entry.trim();
    const sizeMatch = raw.match(/\s*=\s*(\d+)\s*[xX]\s*(\d+)\s*$/);
    if (!sizeMatch) {
        return {
            src: raw,
            key: `${raw}-${index}`
        };
    }
    const width = Number(sizeMatch[1]);
    const height = Number(sizeMatch[2]);
    const src = raw.slice(0, sizeMatch.index).trim();
    return {
        src,
        width,
        height,
        key: `${src}-${width}x${height}-${index}`
    };
}
const parsedImages = computed(() => props.images.map((img, index) => parseImageEntry(img, index)));
const currentImage = computed(() => {
    const fallback = { src: '', key: 'empty' };
    return parsedImages.value[currentIndex.value] ?? fallback;
});
const currentImageStyle = computed(() => {
    const img = currentImage.value;
    const style = {};
    if (img.width)
        style.width = `${img.width}px`;
    if (img.height)
        style.height = `${img.height}px`;
    return style;
});
function checkMobile() {
    isMobile.value = window.innerWidth <= 960;
}
function onTouchStart(e) {
    touchStartX = e.changedTouches[0].clientX;
}
onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
});
onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
});
function onTouchEnd(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    const threshold = 40;
    if (diff > threshold)
        prev();
    else if (diff < -threshold)
        next();
}
const hasPrev = computed(() => currentIndex.value > 0);
const hasNext = computed(() => currentIndex.value < props.images.length - 1);
function prev() {
    if (hasPrev.value) {
        direction.value = 'slide-right';
        currentIndex.value--;
    }
}
function next() {
    if (hasNext.value) {
        direction.value = 'slide-left';
        currentIndex.value++;
    }
}
function goTo(absIndex) {
    if (absIndex === currentIndex.value)
        return;
    direction.value = absIndex > currentIndex.value ? 'slide-left' : 'slide-right';
    currentIndex.value = absIndex;
}
const surroundingImages = computed(() => {
    const result = [];
    const backCount = isMobile.value ? 1 : 2;
    const forwardCount = isMobile.value ? 2 : 2;
    for (let i = -backCount; i <= forwardCount; i++) {
        const idx = currentIndex.value + i;
        if (idx >= 0 && idx < parsedImages.value.length)
            result.push(parsedImages.value[idx].src);
    }
    return result;
});
const offset = computed(() => {
    const backCount = isMobile.value ? 1 : 2;
    return Math.min(backCount, currentIndex.value);
});
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
const altText = computed(() => {
    const caption = props.captions?.[currentIndex.value];
    return caption ? escapeHTML(caption) : `Image ${currentIndex.value + 1}`;
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['top-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['top-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['top-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['thumb']} */ ;
/** @type {__VLS_StyleScopedClasses['thumb']} */ ;
/** @type {__VLS_StyleScopedClasses['thumb']} */ ;
/** @type {__VLS_StyleScopedClasses['image-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['image-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['image-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['all-images-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['thumbnails']} */ ;
/** @type {__VLS_StyleScopedClasses['thumb']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['thumb']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onTouchstart: (__VLS_ctx.onTouchStart) },
    ...{ onTouchend: (__VLS_ctx.onTouchEnd) },
    ...{ class: "gallery-container" },
});
/** @type {__VLS_StyleScopedClasses['gallery-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "gallery-box" },
});
/** @type {__VLS_StyleScopedClasses['gallery-box']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "top-bar" },
});
/** @type {__VLS_StyleScopedClasses['top-bar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.prev) },
    disabled: (!__VLS_ctx.hasPrev),
    'aria-label': "Previous",
    title: "Previous",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    fill: "currentColor",
    d: "m5.83 9l5.58-5.58L10 2l-8 8l8 8l1.41-1.41L5.83 11H18V9z",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "counter" },
});
/** @type {__VLS_StyleScopedClasses['counter']} */ ;
(__VLS_ctx.currentIndex + 1);
(props.images.length);
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.next) },
    disabled: (!__VLS_ctx.hasNext),
    'aria-label': "Next",
    title: "Next",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    fill: "currentColor",
    d: "M2 11h12.2l-5.6 5.6L10 18l8-8l-8-8l-1.4 1.4L14.2 9H2z",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "thumbnails" },
});
/** @type {__VLS_StyleScopedClasses['thumbnails']} */ ;
for (const [img, idx] of __VLS_vFor((__VLS_ctx.surroundingImages))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onPointerdown: () => { } },
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.goTo(__VLS_ctx.currentIndex - __VLS_ctx.offset + idx);
                // @ts-ignore
                [onTouchStart, onTouchEnd, prev, hasPrev, currentIndex, currentIndex, next, hasNext, surroundingImages, goTo, offset,];
            } },
        key: (idx),
        type: "button",
        ...{ class: "thumb" },
        ...{ class: ({ active: __VLS_ctx.currentIndex === (__VLS_ctx.currentIndex - __VLS_ctx.offset + idx) }) },
        'aria-pressed': (__VLS_ctx.currentIndex === (__VLS_ctx.currentIndex - __VLS_ctx.offset + idx)),
        title: (props.captions?.[__VLS_ctx.currentIndex - __VLS_ctx.offset + idx] || `Image ${__VLS_ctx.currentIndex - __VLS_ctx.offset + idx + 1}`),
    });
    /** @type {__VLS_StyleScopedClasses['thumb']} */ ;
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        ...{ onDragstart: () => { } },
        src: (img),
        alt: (props.captions?.[__VLS_ctx.currentIndex - __VLS_ctx.offset + idx] || ''),
        draggable: "false",
    });
    // @ts-ignore
    [currentIndex, currentIndex, currentIndex, currentIndex, currentIndex, currentIndex, currentIndex, offset, offset, offset, offset, offset,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "all-images-hidden" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['all-images-hidden']} */ ;
for (const [img, i] of __VLS_vFor((__VLS_ctx.parsedImages))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        key: ('hidden-' + i),
        src: (img.src),
        alt: (props.captions?.[i] || ''),
        loading: "eager",
        draggable: "false",
    });
    // @ts-ignore
    [parsedImages,];
}
if (props.captions?.[__VLS_ctx.currentIndex]) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "caption" },
    });
    /** @type {__VLS_StyleScopedClasses['caption']} */ ;
    (props.captions[__VLS_ctx.currentIndex]);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "image-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['image-wrapper']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.transition | typeof __VLS_components.Transition | typeof __VLS_components.transition | typeof __VLS_components.Transition} */
transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    name: (__VLS_ctx.direction),
    mode: "out-in",
}));
const __VLS_2 = __VLS_1({
    name: (__VLS_ctx.direction),
    mode: "out-in",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (__VLS_ctx.currentImage.src),
    alt: (__VLS_ctx.altText),
    key: (__VLS_ctx.currentImage.key),
    ...{ style: (__VLS_ctx.currentImageStyle) },
});
// @ts-ignore
[currentIndex, currentIndex, direction, currentImage, currentImage, altText, currentImageStyle,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
