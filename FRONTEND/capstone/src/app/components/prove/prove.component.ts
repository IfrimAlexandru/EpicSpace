import { Component, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-prove',
  templateUrl: './prove.component.html',
  styleUrls: ['./prove.component.scss']
})
export class ProveComponent implements AfterViewInit, OnDestroy {
  private scrollHandler!: () => void;

  ngAfterViewInit(): void {
    const items: NodeListOf<HTMLElement> = document.querySelectorAll(".item");
    const carousel: HTMLElement | null = document.querySelector(".carousel");

    if (!carousel) {
      throw new Error("Carousel element not found");
    }

    this.scrollHandler = () => {
      const proportion: number = carousel.getBoundingClientRect().top / window.innerHeight;
      const index: number = Math.ceil(-1 * (proportion + 0.5));

      items.forEach((item, i) => {
        item.className = "item";
        if (i === index) {
          item.className = "item active";
        }
      });
    };

    document.addEventListener("scroll", this.scrollHandler);
  }

  ngOnDestroy(): void {
    document.removeEventListener("scroll", this.scrollHandler);
  }
}
