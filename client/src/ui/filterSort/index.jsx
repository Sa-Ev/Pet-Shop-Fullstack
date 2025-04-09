import { useSearchParams } from "react-router-dom";
import CustomSelect from "../select";
import Input from "../input";
import styles from "./styles.module.scss";

const FilterSort = ({
  setMinPrice,
  setMaxPrice,
  setOnlyDiscounted,
  setSelectedCategory,
  setSortOrder,
  categories,
  showCategorySelect = true,
  showDiscountCheckbox = true,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParams = {
    minPrice: searchParams.get("min") ?? "",
    maxPrice: searchParams.get("max") ?? "",
    category: searchParams.get("category") ?? "",
    discountOnly: searchParams.get("discountOnly") === "1",
    sortOrder: searchParams.get("sort") ?? "",
  };

  function handleFilterChange(param, value) {
    const newParams = new URLSearchParams(searchParams);

    switch (param) {
      case "min":
        if (value) {
          newParams.set("min", value);
          setMinPrice(value);
        } else {
          newParams.delete("min");
          setMinPrice("");
        }
        break;
      case "max":
        if (value) {
          newParams.set("max", value);
          setMaxPrice(value);
        } else {
          newParams.delete("max");
          setMaxPrice("");
        }
        break;
      case "discountOnly":
        if (value) {
          newParams.set("discountOnly", "1");
        } else {
          newParams.delete("discountOnly");
        }
        setOnlyDiscounted(value);
        break;
      case "category":
        if (value) {
          const category = categories.find(
            (cat) => cat.category.id.toString() === value
          );
          newParams.set("category", category?.category.title ?? "");
        } else {
          newParams.delete("category");
        }
        setSelectedCategory(value);
        break;
      case "sort":
        if (value) {
          newParams.set("sort", value);
        } else {
          newParams.delete("sort");
        }
        setSortOrder(value);
        break;
    }

    setSearchParams(newParams);
  }

  // Опции для селектора сортировки
  const sortOptions = [
    { label: "Default", value: "" },
    { label: "Low to High", value: "asc" },
    { label: "High to Low", value: "desc" },
  ];

  return (
    <div className={styles.mainSortContainer}>
      <div className={styles.inputsContainer}>
        <p>Price</p>
        <Input
          type="number"
          name="minPrice"
          value={filterParams.minPrice}
          onChange={(e) => handleFilterChange("min", e.target.value)}
          placeholder="Min"
        />
        <Input
          type="number"
          name="maxPrice"
          value={filterParams.maxPrice}
          onChange={(e) => handleFilterChange("max", e.target.value)}
          placeholder="Max"
        />
      </div>

      <div className={styles.sortContainer}>
        {showDiscountCheckbox && (
          <label>
            Discounted items
            <Input
              type="checkbox"
              name="onlyDiscounted"
              checked={filterParams.discountOnly}
              onChange={(e) =>
                handleFilterChange("discountOnly", e.target.checked)
              }
            />
          </label>
        )}

        <label>
          Sorted
          <CustomSelect
            options={sortOptions}
            value={sortOptions.find(
              (opt) => opt.value === filterParams.sortOrder
            )}
            onChange={(option) => handleFilterChange("sort", option.value)}
            placeholder="by default"
          />
        </label>
      </div>

      {showCategorySelect && (
        <div>
          <label>
            Category:
            <CustomSelect
              options={[
                { label: "All Categories", value: "" },
                ...categories.map((category) => ({
                  label: category.category.title,
                  value: category.category.id.toString(),
                })),
              ]}
              value={categories.find(
                (category) => category.category.title === filterParams.category
              )}
              onChange={(option) =>
                handleFilterChange("category", option.value)
              }
              placeholder="Select category"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default FilterSort;
