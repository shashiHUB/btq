export function GoogleReviews() {
  return (
    <div className="bg-secondary-light p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-serif font-bold text-primary mb-4">Customer Reviews</h3>
      <div className="grid gap-4">
        {/* Google Reviews Widget */}
        <div className="aspect-[4/3] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15421.992877999005!2d76.6588888!3d13.7042222!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba549b6e6999dd5%3A0x58427fecd13d99cc!2sUsha%20Makeover!5e0!3m2!1sen!2sin!4v1709707321979!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
            title="Usha Makeover Location and Reviews"
          />
        </div>
        {/* Direct Link to Google Reviews */}
        <a
          href="https://www.google.com/search?q=UshaMakeOver.com&kgmid=/g/11x8c17c9t#lrd=0x3ba549b6e6999dd5:0x58427fecd13d99cc,1,,,,,"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-center py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Write a Review
        </a>
      </div>
    </div>
  );
}