# ngx-split-text

<a href="https://ngxui.com" target="_blank" style="display: flex;gap: .5rem;align-items: center;cursor: pointer; padding: 0 0 0 0; height: fit-content;">
  <img src="https://ngxui.com/assets/img/ngxui-logo.png" style="width: 64px;height: 64px;">
</a>

This library is part of the NGXUI ecosystem.
View all available components at [https://ngxui.com](https://ngxui.com)

`@omnedia/ngx-split-text` is an Angular library that provides a performant, scroll-activated split text animation effect, supporting GSAP animation easings. The component lets you split text into characters, words, or lines and animate each item with full control over timing and easing.

## Features

* Animates text by splitting into chars, words, or lines.
* Uses GSAP for robust, production-grade animation (including spring/elastic easing).
* Scroll-triggered: animates when entering viewport.
* Highly customizable animation: control split type, timing, easing, from/to states.
* Fully standalone, signal-based, Angular v20 compatible.

## Installation

Install the library and GSAP:

```
npm install @omnedia/ngx-split-text gsap
```

## Usage

Import the `NgxSplitTextComponent` in your Angular module or component:

```typescript
import {NgxSplitTextComponent} from '@omnedia/ngx-split-text';

@Component({
  ...
    imports:
[
  ...
    NgxSplitTextComponent,
],
...
})
```

Use the component in your template:

```html

<om-split-text
  [text]="'Hello, GSAP!'"
  [splitType]="'chars'"
  [delay]="50"
  [duration]="1.2"
  [ease]="'elastic.out(1, 0.3)'"
  [from]="{ opacity: 0, y: 40 }"
  [to]="{ opacity: 1, y: 0 }"
  styleClass="custom-split-text"
  (onLetterAnimationComplete)="handleComplete()"
></om-split-text>
```

## API

```html

<om-split-text
  [text]="text"
  [splitType]="splitType" // 'chars' | 'words' | 'lines'
  [delay]="delay"
  [duration]="duration"
  [ease]="ease"
  [from]="fromOptions"
  [to]="toOptions"
  styleClass="your-custom-class"
  (onLetterAnimationComplete)="yourHandler()"
></om-split-text>
```

* `text` (required): Text content to split and animate.
* `splitType`: `'chars'` | `'words'` | `'lines'`. How to split the text. Default: `'chars'`.
* `delay`: Delay between each split element's animation (in ms). Default: `50`.
* `duration`: Animation duration for each element (in seconds). Default: `2`.
* `ease`: GSAP ease string. Example: `'elastic.out(1, 0.3)'`, `'power3.out'`, etc. Default: `'elastic.out(1, 0.3)'`.
* `from`: Initial animation state, e.g. `{ opacity: 0, y: 20 }`.
* `to`: Final animation state, e.g. `{ opacity: 1, y: 0 }`.
* `styleClass`: Optional CSS class for the container.
* `onLetterAnimationComplete`: Event emitted when the last element finishes animating.

## Example

```html

<om-split-text
  [text]="'Animate this text!\nOn multiple lines.'"
  [splitType]="'lines'"
  [delay]="80"
  [duration]="1.2"
  [ease]="'elastic.out(1, 0.3)'"
  [from]="{ opacity: 0, y: 60 }"
  [to]="{ opacity: 1, y: 0 }"
  styleClass="split-text-demo"
  (onLetterAnimationComplete)="onAnimationDone()"
></om-split-text>
```

This will animate each line with an elastic effect as it scrolls into view.

## Styling

Customize appearance with `styleClass` and your own CSS:

```css
.split-text-demo {
  font-size: 2rem;
  font-weight: bold;
  color: #222;
}
```

## Notes

* For `splitType='lines'`, the `text` input must have real line breaks (`\n`) for each line.
* GSAP must be installed in your project (`npm i gsap`).
* Animations are triggered when the component scrolls into view.
* The library is SSR-safe (animations run only in the browser).

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss your ideas.

## License

MIT
