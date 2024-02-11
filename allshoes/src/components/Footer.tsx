export default function Footer() {
  return (
    <>
      <footer className="w-full h-[20rem] px-20 py-12 poppins border-t border-gray-300">
        <h1 className="text-4xl font-bold tracking-wide">
          The Allshoes approach
        </h1>

        <div className="grid grid-cols-3 mt-8 gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-wide">
              Wear-All-Day Comfort
            </h3>
            <p className="mt-2">
              Lightweight, bouncy, and wildly comfortable, Allbirds shoes make
              any outing feel effortless. Slip in, lace up, or slide them on and
              enjoy the comfy support.
            </p>
            <p>Learn More</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-wide">
              Sustainability In Every Step
            </h3>
            <p className="mt-2">
              From materials to transport, we&apos;re working to reduce our
              carbon footprint to near zero. Holding ourselves accountable and
              striving for climate goals isn&apos;t a 30-year goal—it&apos;s
              now.
            </p>
            <p>Learn More</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-wide">
              Materials From The Earth
            </h3>
            <p className="mt-2">
              We replace petroleum-based synthetics with natural alternatives
              wherever we can. Like using wool, tree fiber, and sugar cane.
              They&apos;re soft, breathable, and better for the planet—win, win,
              win.
            </p>
            <p>Learn More</p>
          </div>
        </div>
      </footer>

      <footer className="w-full h-auto bg-black text-white">
        <div className="flex flex-col px-12 pt-8">
          <h4 className="font-bold text-center text-2xl">Company</h4>

          <div className="mt-8 flex justify-evenly">
            <div className="flex flex-col gap-2">
              <p>Our Stores</p>
              <p>Our Story</p>
              <p>Our Materials</p>
              <p>Sustainability</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>Investors</p>
              <p>Shoe Care</p>
              <p>Partnerships</p>
              <p>Product Testing</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>Affiliates</p>
              <p>Bulk Orders</p>
              <p>Careers</p>
              <p>Community Offers</p>
            </div>
          </div>
        </div>

        <div className="w-full h-24 flex flex-col items-center mt-16 gap-4">
          <p>
            © 2024 Allshoes, Inc. All Rights Reserved. Terms, Privacy &
            Accessibility
          </p>
          <p className="underline">Do not sell my private information</p>
        </div>
      </footer>
    </>
  );
}
