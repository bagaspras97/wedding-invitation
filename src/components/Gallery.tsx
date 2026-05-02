"use client";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gallery } from "@/lib/content";

export default function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: false },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="galeri" className="bg-ivory py-28 md:py-36">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow">Galeri</p>
          <h2 className="h-display mt-4 text-4xl md:text-5xl">Momen Berharga</h2>
          <p className="mt-6 text-stone">
            Sebuah perjalanan yang terekam dalam bingkai-bingkai kenangan.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="relative mt-16"
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {gallery.map((src, i) => (
              <div
                key={i}
                className="relative mx-2 aspect-[3/4] w-[80%] flex-[0_0_80%] md:w-[45%] md:flex-[0_0_45%] lg:w-[35%] lg:flex-[0_0_35%]"
              >
                <img
                  src={src}
                  alt={`Galeri ${i + 1}`}
                  className={`h-full w-full object-cover transition duration-700 ${
                    selected === i ? "opacity-100 saturate-100" : "opacity-60 saturate-50"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="container-narrow mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="grid h-10 w-10 place-items-center border border-ink/20 transition hover:border-accent hover:text-accent"
            aria-label="Sebelumnya"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs uppercase tracking-widest2 text-stone">
            {String(selected + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="grid h-10 w-10 place-items-center border border-ink/20 transition hover:border-accent hover:text-accent"
            aria-label="Selanjutnya"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
