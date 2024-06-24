import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";

const SearchBar = ({ setResults, setShowResults }) => {
  const [input, setInput] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const fetchItem = (value) => {
    fetch(`http://localhost:5050/inventory`)
      .then((response) => response.json())
      .then((products) => {
        const results = products
          .filter((product) =>
            product.title.toLowerCase().includes(value.toLowerCase())
          )
          .map((product) => ({
            _id: product._id,
            title: product.title,
            author: product.author,
            publicationYear: product.publicationYear,
            imageurl: product.imageurl,
          }));
        setResults(results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    if (value.trim() === "") {
      setResults([]);
    } else {
      fetchItem(value);
    }
  };

  const handleSearch = () => {
    if (input.trim() !== "") {
      navigate(`/shop?searchby=${encodeURIComponent(input.trim())}`);
      setShowResults(false);
    }
  };

  return (
    <div ref={searchRef}>
      <input
        style={{ width: "calc(100% - 20px)", paddingLeft: "20px" }}
        className="search-input"
        placeholder="Search for textbooks by title, author, etc."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setShowResults(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <i
        className="fa fa-search"
        style={{
          position: "absolute",
          right: "12%",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
        onClick={handleSearch}
      ></i>
    </div>
  );
};

const SearchResult = ({ result, setShowResults }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop/item/${result._id}`);
    setShowResults(false);
  };

  return (
    <div class="row" onClick={handleClick}>
      <div class="col-2" style={{ backgroundColor: "transparent" }}>
        <img src={result.imageurl} style={{ width: "50px" }} alt={result.title} />
      </div>
      <div class="col-10" style={{ backgroundColor: "transparent", marginTop: "10px", lineHeight:"0.9em" }}>
        <p style={{ fontSize: "15px" }}>{result.title}</p>
        <small style={{ paddingLeft: "5px", fontStyle: "italic", opacity: 0.8, fontSize:"0.75em" }}>
          by {result.author} ({result.publicationYear})
          </small>
      </div>
    </div>
  );
};

const SearchResultsList = ({ results, setShowResults }) => {
  return (
    <div className="autocomplete-items">
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} setShowResults={setShowResults} />;
      })}
    </div>
  );
};

const SearchHeader = () => {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const wrapperRef = useRef(null);

  const handleMouseLeave = (e) => {
    if (wrapperRef.current && e.relatedTarget instanceof Node && !wrapperRef.current.contains(e.relatedTarget)) {
      setShowResults(false);
    }
  };

  return (
    <div ref={wrapperRef} onMouseLeave={handleMouseLeave}>
      <SearchBar setResults={setResults} setShowResults={setShowResults} />
      {showResults && <SearchResultsList results={results} setShowResults={setShowResults} />}
    </div>
  );
};

export { SearchBar, SearchResult, SearchResultsList, SearchHeader };
