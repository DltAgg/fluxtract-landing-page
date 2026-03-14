import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import { About } from "./About";
import { slides, AUTOPLAY_MS } from "./FeatureCarousel";

vi.mock("framer-motion", () => {
  const React = require("react");
  const cache: Record<string, React.FC> = {};
  return {
    motion: new Proxy(
      {},
      {
        get: (_target: unknown, prop: string) => {
          if (!cache[prop]) {
            cache[prop] = React.forwardRef(
              (props: Record<string, unknown>, ref: unknown) => {
                const {
                  initial,
                  animate,
                  exit,
                  variants,
                  transition,
                  whileInView,
                  viewport,
                  drag,
                  dragConstraints,
                  dragElastic,
                  style: styleProp,
                  ...rest
                } = props;
                return React.createElement(prop, {
                  ...rest,
                  style: styleProp,
                  ref,
                });
              },
            );
          }
          return cache[prop];
        },
      },
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => {
      const childArray = React.Children.toArray(children);
      return childArray.length > 0 ? childArray[childArray.length - 1] : null;
    },
  };
});

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, ...rest } = props;
    return <img {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

vi.mock("@/components/shared/section-layout/SectionLayout", () => ({
  SectionLayout: () => <div data-testid="section-layout" />,
}));

vi.mock("@/components/shared/page-slot/PageSlot", () => ({
  PageSlot: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/shared/app-icon/AppIcon", () => ({
  AppIcon: () => <div data-testid="app-icon" />,
}));

describe("About section — carousel and illustration synchronization", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  function getDesktopIllustrationSrc(): string {
    const imgs = document.querySelectorAll(".folderIllustration");
    return imgs[0]?.getAttribute("src") ?? "";
  }

  function getMobileIllustrationSrc(): string {
    const imgs = document.querySelectorAll(".folderIllustration");
    return imgs[1]?.getAttribute("src") ?? "";
  }

  function getCardTitles(): string[] {
    const titles = document.querySelectorAll(".cardTitle");
    return Array.from(titles).map((t) => t.textContent ?? "");
  }

  function getDesktopNavButtons(): HTMLButtonElement[] {
    const navs = document.querySelectorAll(".cardNav");
    const desktopNav = navs[0];
    return Array.from(desktopNav?.querySelectorAll("button") ?? []);
  }

  it("starts with the first slide and first illustration", () => {
    render(<About />);

    expect(getDesktopIllustrationSrc()).toBe("/illustrations/contract.svg");
    expect(getCardTitles()[0]).toBe("Contracts");
  });

  it("desktop and mobile illustrations match on initial render", () => {
    render(<About />);

    expect(getDesktopIllustrationSrc()).toBe(getMobileIllustrationSrc());
  });

  it("clicking next advances both carousel and illustration", () => {
    render(<About />);

    const buttons = getDesktopNavButtons();
    expect(buttons).toHaveLength(2);

    act(() => {
      fireEvent.click(buttons[1]); // next button
    });

    expect(getDesktopIllustrationSrc()).toBe(
      "/illustrations/bulk-extraction.svg",
    );
    expect(getDesktopIllustrationSrc()).toBe(getMobileIllustrationSrc());
    expect(getCardTitles()[0]).toBe("Bulk extraction");
  });

  it("clicking prev wraps from first to last slide", () => {
    render(<About />);

    const buttons = getDesktopNavButtons();
    expect(buttons).toHaveLength(2);

    // Click prev (first button)
    act(() => {
      fireEvent.click(buttons[0]);
    });
    const titles = getCardTitles();
    expect(titles[0]).toBe("Data analysis");
    expect(getDesktopIllustrationSrc()).toBe(
      "/illustrations/data-analysis.svg",
    );
  });

  it("autoplay advances slide and illustration together", async () => {
    render(<About />);

    expect(getDesktopIllustrationSrc()).toBe("/illustrations/contract.svg");

    // Advance timer and flush state updates
    await act(async () => {
      vi.advanceTimersByTime(AUTOPLAY_MS + 100);
    });

    expect(getDesktopIllustrationSrc()).toBe(
      "/illustrations/bulk-extraction.svg",
    );
    expect(getDesktopIllustrationSrc()).toBe(getMobileIllustrationSrc());
  });

  it("full autoplay cycle returns to first slide", async () => {
    render(<About />);

    const expected = [
      "/illustrations/bulk-extraction.svg",
      "/illustrations/search-content.svg",
      "/illustrations/data-analysis.svg",
      "/illustrations/contract.svg",
    ];

    for (let i = 0; i < slides.length; i++) {
      await act(async () => {
        vi.advanceTimersByTime(AUTOPLAY_MS + 100);
      });
      expect(getDesktopIllustrationSrc()).toBe(expected[i]);
      expect(getDesktopIllustrationSrc()).toBe(getMobileIllustrationSrc());
    }
  });

  it("manual click resets autoplay timer (no double-advance)", async () => {
    render(<About />);

    const buttons = getDesktopNavButtons();

    // Partially through autoplay interval
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    // Manual click to slide 1
    act(() => {
      fireEvent.click(buttons[1]); // next
    });
    expect(getDesktopIllustrationSrc()).toBe(
      "/illustrations/bulk-extraction.svg",
    );

    // 3s after click — should still be slide 1 (timer reset)
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    expect(getDesktopIllustrationSrc()).toBe(
      "/illustrations/bulk-extraction.svg",
    );

    // Full autoplay interval after click — should advance to slide 2
    await act(async () => {
      vi.advanceTimersByTime(AUTOPLAY_MS - 3000 + 100);
    });
    expect(getDesktopIllustrationSrc()).toBe(
      "/illustrations/search-content.svg",
    );
  });

  it("clicking a dot navigates to the correct slide", () => {
    render(<About />);

    const dotsContainers = document.querySelectorAll(".dots");
    const desktopDots = dotsContainers[0]?.querySelectorAll(".dot");
    expect(desktopDots?.length).toBe(slides.length);

    // Click the 3rd dot (index 2 = "Search content")
    act(() => {
      fireEvent.click(desktopDots![2]);
    });

    expect(getDesktopIllustrationSrc()).toBe(
      "/illustrations/search-content.svg",
    );
    expect(getDesktopIllustrationSrc()).toBe(getMobileIllustrationSrc());
    expect(getCardTitles()[0]).toBe("Search content");
  });
});
