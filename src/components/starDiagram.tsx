interface Params{
    procentage: number
}

export const StarDiagram = (params: Params) => {
  // Convert popularity (0–100) to a 0–10 scale
  const rating = params.procentage / 10;
  const fullStars = Math.floor(rating);
  const partial = rating - fullStars;

 return (
    <span className="star-diagram">
      {[...Array(10)].map((_, i) => (
        <span key={i} className="star">
          <span
            className="star-fill"
            style={{
              width:
                i < fullStars ? "100%" : i === fullStars ? `${partial * 100}%` : "0%",
            }}
          ></span>
        </span>
      ))}
    </span>
  );
};