import React, { useState, useEffect, useId, useCallback } from "react";

const FilterPrice = ({ onPriceChange }) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);

  useEffect(() => {
    onPriceChange(selectedPriceRange);
  }, [selectedPriceRange, onPriceChange]);

  const itemPriceRanges = [
    { label: "$0 - $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: 5000 },
  ];

  return (
    <div>
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Filter by Price</span>
      </h5>
      <div className="bg-light p-4 mb-30">
        <form>
          {itemPriceRanges.map((range) => (
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3" key={`price-range-${range.label}`}>
              <input
                type="checkbox"
                className="custom-control-input"
                id={`price-range-${range.label}`}
                checked={selectedPriceRange.includes(range.label)}
                onChange={() => {
                  if (selectedPriceRange.includes(range.label)) {
                    setSelectedPriceRange(selectedPriceRange.filter((r) => r !== range.label));
                  } else {
                    setSelectedPriceRange([...selectedPriceRange, range.label]);
                  }
                }}
              />
              <label className="custom-control-label" htmlFor={`price-range-${range.label}`}>{range.label}</label>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

const FilterSubject = ({ onTagsChange }) => {
  const [itemData, setItemData] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const id = useId();

  useEffect(() => {
    async function getItems() {
      try {
        const response = await fetch(`http://localhost:5050/inventory/`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const itemData = await response.json();
        setItemData(itemData);
      } catch (error) {
        window.alert(error.message);
      }
    }

    getItems();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleTagChange = useCallback(
    (tag) => {
      setSelectedTag(tag);
      onTagsChange([tag]);
    },
    [onTagsChange]
  );

  const resetTags = () => {
    setSelectedTag(null);
    onTagsChange([]);
  };

  const filteredTags = itemData.flatMap((item) => item.subject).filter((tag) => tag && tag.trim() !== "");
  const uniqueTags = Array.from(new Set(filteredTags));

  return (
    <div>
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Filter by Subject</span>
      </h5>
      <div className="bg-light p-4 mb-30">
        <form>
          <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3" key={`unique-tag-${id}-all`}>
            <input type="radio" id={`tag-all`} name="tag" value="all"
              className="custom-control-input"
              checked={selectedTag === null}
              onChange={() => resetTags()}
            />
            <label className="custom-control-label" htmlFor={`tag-all`}>All Subjects</label>
            <span className="badge border font-weight-normal">{itemData.length}</span>
          </div>
          {uniqueTags.map((tag) => {
            const tagCount = itemData.filter((item) => item.subject.includes(tag)).length;
            return (
              <div className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3" key={`unique-tag-${id}-${tag}`}>
                <input type="radio" id={`tag-${tag}`} name="tag" value={tag}
                  className="custom-control-input"
                  checked={selectedTag === tag}
                  onChange={() => handleTagChange(tag)}
                />
                <label className="custom-control-label" htmlFor={`tag-${tag}`}>{tag}</label>
                <span className="badge border font-weight-normal">{tagCount}</span>
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
};

const Sort = ({ onSort }) => {
  const handleSortChange = (value) => {
    onSort(value);
  };

  return (
    <div className="btn-group">
      <button className="btn bg-primary text-white mb-3 dropdown-toggle" data-toggle="dropdown">
        Sort by
      </button>
      <div className="dropdown-menu dropdown-menu-right mb-3">
        <p className="dropdown-item" onClick={() => handleSortChange("lowPrice")}>
          Price Low to High
        </p>
        <p className="dropdown-item" onClick={() => handleSortChange("highPrice")}>
          Price High to Low
        </p>
        <p className="dropdown-item" onClick={() => handleSortChange("alphabetic")}>
          Alphabetic A - Z
        </p>
      </div>
    </div>
  );
}

export { FilterSubject, FilterPrice, Sort };
