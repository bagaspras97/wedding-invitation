const concepts = [
  {
    name: "01 / Cinematic",
    image: "/images/chapter3-story2.jpg",
    className: "bg-[#17130f] text-ivory",
    content: (
      <>
        <div className="absolute inset-0">
          <img
            src="/images/chapter3-story2.jpg"
            alt=""
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,14,10,0.2)_0%,rgba(18,14,10,0.5)_54%,rgba(18,14,10,0.78)_100%)]" />
        </div>
        <div className="relative z-10 flex h-full flex-col px-8 py-10">
          <div className="mt-auto text-center">
            <p className="mb-6 text-[0.68rem] uppercase tracking-[0.34em] text-ivory/72">
              Dear Bagas Family
            </p>
            <h2 className="font-display text-[4.7rem] font-light italic leading-[0.86]">
              Yolla &<br />Pras
            </h2>
            <p className="mt-6 text-[0.7rem] uppercase tracking-[0.32em] text-ivory/70">
              6 Juni 2026
            </p>
            <button className="mt-10 rounded-full bg-ivory px-8 py-4 text-[0.7rem] font-medium uppercase tracking-[0.26em] text-ink">
              Open Invitation
            </button>
          </div>
        </div>
      </>
    ),
  },
  {
    name: "02 / Editorial",
    image: "/images/hero.jpg",
    className: "bg-ivory text-ink",
    content: (
      <div className="flex h-full flex-col px-7 py-7">
        <div className="h-[36%] overflow-hidden rounded-[2rem]">
          <img
            src="/images/hero.jpg"
            alt=""
            className="h-full w-full object-cover opacity-90"
            style={{ filter: "brightness(1.08) sepia(0.18) saturate(0.86)" }}
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-[0.66rem] uppercase tracking-[0.34em] text-stone">
            Dear Bagas Family
          </p>
          <h2 className="mt-8 flex flex-col items-center font-display font-light italic leading-[0.82]">
            <span className="text-[5.1rem]">Yolla</span>
            <span className="-my-1 text-[2.4rem] leading-none text-stone">&</span>
            <span className="text-[5.1rem]">Pras</span>
          </h2>
          <p className="mt-8 text-[0.72rem] uppercase tracking-[0.3em] text-stone">
            6 Juni 2026
          </p>
        </div>
        <button className="rounded-full bg-ink px-8 py-4 text-[0.7rem] font-medium uppercase tracking-[0.26em] text-ivory">
          Open Invitation
        </button>
      </div>
    ),
  },
  {
    name: "03 / Split",
    image: "/images/chapter3-story2.jpg",
    className: "bg-ivory text-ink",
    content: (
      <div className="flex h-full flex-col">
        <div className="flex min-h-[42%] flex-col items-center justify-center px-8 pt-10 text-center">
          <p className="text-[0.66rem] uppercase tracking-[0.34em] text-stone">
            Dear Bagas Family
          </p>
          <h2 className="mt-6 flex flex-col items-center font-display font-light italic leading-[0.84]">
            <span className="text-[4.45rem]">Yolla</span>
            <span className="-my-1 text-[2.1rem] leading-none text-stone">&</span>
            <span className="text-[4.45rem]">Pras</span>
          </h2>
          <p className="mt-6 text-[0.7rem] uppercase tracking-[0.3em] text-stone">
            6 Juni 2026
          </p>
        </div>
        <div className="relative flex-1 px-5 pb-5">
          <button className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink px-7 py-4 text-[0.66rem] font-medium uppercase tracking-[0.24em] text-ivory shadow-[0_20px_50px_-30px_rgba(43,38,32,0.75)]">
            Open Invitation
          </button>
          <div className="h-full overflow-hidden rounded-[2rem] bg-ink">
            <img
              src="/images/chapter3-story2.jpg"
              alt=""
              className="h-full w-full object-cover opacity-72"
              style={{ filter: "brightness(0.88) sepia(0.2) saturate(0.84)" }}
            />
            <div className="absolute inset-x-5 bottom-5 top-[46%] rounded-b-[2rem] bg-[linear-gradient(180deg,transparent,rgba(20,16,12,0.48))]" />
          </div>
        </div>
      </div>
    ),
  },
];

export default function CoverConceptsPage() {
  return (
    <main className="min-h-screen bg-[#ede8df] px-6 py-12 text-ink">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <p className="eyebrow">Cover invitation concepts</p>
          <h1 className="font-display text-5xl font-light leading-none md:text-7xl">
            choose the opening mood
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {concepts.map((concept) => (
            <section key={concept.name} className="mx-auto w-full max-w-[390px]">
              <p className="mb-4 text-center text-[0.66rem] uppercase tracking-[0.28em] text-stone">
                {concept.name}
              </p>
              <div
                className={`relative aspect-[390/844] overflow-hidden rounded-[2.4rem] shadow-[0_32px_100px_-62px_rgba(43,38,32,0.55)] ${concept.className}`}
              >
                {concept.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
