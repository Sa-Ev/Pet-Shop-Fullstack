import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchCategories } from "../../redux/slices/categoriesSlice";
import { addToBasket } from "../../redux/slices/basketSlice"; //
import { filterAndSortProducts } from "../../utils/filterAndSortProducts";
import FilterSort from "../../ui/filterSort";
import FlexBox from "../../ui/flexBox";
import ProductCard from "../../ui/card";

export default function AllProducts() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const [visibleItem, setVisibleItem] = useState(8);
  const [filters, setFilters] = useState({
    minPrice: searchParams.get("min") || "",
    maxPrice: searchParams.get("max") || "",
    onlyDiscounted: searchParams.get("discountOnly") === "1",
    selectedCategory: searchParams.get("category") || "",
    sortOrder: searchParams.get("sort") || "asc",
  });

  function handleAddToCart(product) {
    dispatch(addToBasket(product));
  }

  function loadMore() {
    setVisibleItem((prevCount) => prevCount + 4);
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilters({
      minPrice: searchParams.get("min") || "",
      maxPrice: searchParams.get("max") || "",
      onlyDiscounted: searchParams.get("discountOnly") === "1",
      selectedCategory: searchParams.get("category") || "",
      sortOrder: searchParams.get("sort") || "asc",
    });
  }, [searchParams]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const allProducts = categories.flatMap((category) => category.data);
  const filteredAndSortedProducts = filterAndSortProducts(allProducts, filters);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ margin: "0 2.8%" }}>
        <h1 style={{ margin: "2.8% 0" }}>All Products</h1>
        <FilterSort
          {...filters}
          setMinPrice={(value) =>
            setFilters((prev) => ({ ...prev, minPrice: value }))
          }
          setMaxPrice={(value) =>
            setFilters((prev) => ({ ...prev, maxPrice: value }))
          }
          setOnlyDiscounted={(value) =>
            setFilters((prev) => ({ ...prev, onlyDiscounted: value }))
          }
          setSelectedCategory={(value) =>
            setFilters((prev) => ({ ...prev, selectedCategory: value }))
          }
          setSortOrder={(value) =>
            setFilters((prev) => ({ ...prev, sortOrder: value }))
          }
          categories={categories}
        />
        <FlexBox>
          {filteredAndSortedProducts.length === 0 ? (
            <div style={{ margin: "2%", fontSize: "26px", color: "red" }}>
              No products available
            </div>
          ) : (
            filteredAndSortedProducts
              .slice(0, visibleItem)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  discont_price={product.discont_price}
                  image={`http://localhost:3333/${product.image}`}
                  onAddToCart={() => handleAddToCart(product)}
                  navigatePath={`/category/product/${product.id}`}
                  initialText="Add to Cart"
                  toggledText="Added"
                  isCategoryButton={false}
                />
              ))
          )}
        </FlexBox>
        {visibleItem < filteredAndSortedProducts.length && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span
              style={{ cursor: "pointer", padding: "5px 8px" }}
              onClick={loadMore}
            >
              more items...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
