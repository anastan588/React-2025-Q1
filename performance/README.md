# Performance app

App downloads information about countries

### Apps and Packages

"react"
"react-router"
"eslint"
"husky":
"prettier"
"typescript"
"vite"
"vitest"
"tailwindcss"

### Working locally

cd performance

npm i

npm run build

npm run dev

### 1. Performance Analysis of Country Sorting

| Action                        | Before Optimization (Time, Render Duration, Committed at)                                                                                                    | After Optimization (Time, Render Duration, Committed at)                                                                                                   | Change   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **Sort by Name (Ascending)**  | ![](./src/assets/sorting_by_name/before/ice_screenshot_20250323-170405.png) <br> ![](./src/assets/sorting_by_name/before/ice_screenshot_20250323-170426.png) | ![](./src/assets/sorting_by_name/after/ice_screenshot_20250323-200518.png) <br> ![](./src/assets/sorting_by_name/after/ice_screenshot_20250323-200541.png) | Improved |
| **Sort by Name (Descending)** | ![](./src/assets/sorting_by_name/before/ice_screenshot_20250323-170412.png) <br> ![](./src/assets/sorting_by_name/before/ice_screenshot_20250323-170431.png) | ![](./src/assets/sorting_by_name/after/ice_screenshot_20250323-200523.png) <br> ![](./src/assets/sorting_by_name/after/ice_screenshot_20250323-200541.png) | Improved |
| **Reset Sorting**             | ![](./src/assets/sorting_by_name/before/ice_screenshot_20250323-170419.png) <br> ![](./src/assets/sorting_by_name/before/ice_screenshot_20250323-170436.png) | ![](./src/assets/sorting_by_name/after/ice_screenshot_20250323-200528.png) <br> ![](./src/assets/sorting_by_name/after/ice_screenshot_20250323-200545.png) | Improved |

### 2. Performance Analysis of Country Sorting by Population

| Action                              | Before Optimization (Time, Render Duration, Committed at)                                                                                                                | After Optimization (Time, Render Duration, Committed at)                                                                                                               | Change   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **Sort by Population (Ascending)**  | ![](./src/assets/sorting_by_population/before/ice_screenshot_20250323-184159.png) <br> ![](./src/assets/sorting_by_population/before/ice_screenshot_20250323-184222.png) | ![](./src/assets/sorting_by_population/after/ice_screenshot_20250323-202323.png) <br> ![](./src/assets/sorting_by_population/after/ice_screenshot_20250323-202302.png) | Improved |
| **Sort by Population (Descending)** | ![](./src/assets/sorting_by_population/before/ice_screenshot_20250323-184205.png) <br> ![](./src/assets/sorting_by_population/before/ice_screenshot_20250323-184226.png) | ![](./src/assets/sorting_by_population/after/ice_screenshot_20250323-202328.png) <br> ![](./src/assets/sorting_by_population/after/ice_screenshot_20250323-202306.png) | Improved |
| **Reset Sorting**                   | ![](./src/assets/sorting_by_population/before/ice_screenshot_20250323-184210.png) <br> ![](./src/assets/sorting_by_population/before/ice_screenshot_20250323-184231.png) | ![](./src/assets/sorting_by_population/after/ice_screenshot_20250323-202332.png) <br> ![](./src/assets/sorting_by_population/after/ice_screenshot_20250323-202311.png) | Improved |

### 3. Performance Analysis of Searching Country by Name (Italy)

| Action                 | Before Optimization (Time, Render Duration, Committed at)                                                                                                  | After Optimization (Time, Render Duration, Committed at)                                                                                                 | Change   |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **Search for 'I'**     | ![](./src/assets/search_by_name/before/ice_screenshot_20250323-184422.png) <br> ![](./src/assets/search_by_name/before/ice_screenshot_20250323-184512.png) | ![](./src/assets/search_by_name/after/ice_screenshot_20250323-203425.png) <br> ![](./src/assets/search_by_name/after/ice_screenshot_20250323-203350.png) | Improved |
| **Search for 'It'**    | ![](./src/assets/search_by_name/before/ice_screenshot_20250323-184428.png) <br> ![](./src/assets/search_by_name/before/ice_screenshot_20250323-184517.png) | ![](./src/assets/search_by_name/after/ice_screenshot_20250323-203430.png) <br> ![](./src/assets/search_by_name/after/ice_screenshot_20250323-203358.png) | Improved |
| **Search for 'Ita'**   | ![](./src/assets/search_by_name/before/ice_screenshot_20250323-184432.png) <br> ![](./src/assets/search_by_name/before/ice_screenshot_20250323-184521.png) | ![](./src/assets/search_by_name/after/ice_screenshot_20250323-203434.png) <br> ![](./src/assets/search_by_name/after/ice_screenshot_20250323-203403.png) | Improved |
| **Search for 'Ital'**  | ![](./src/assets/search_by_name/before/ice_screenshot_20250323-184437.png) <br> ![](./src/assets/search_by_name/before/ice_screenshot_20250323-184526.png) | ![](./src/assets/search_by_name/after/ice_screenshot_20250323-203439.png) <br> ![](./src/assets/search_by_name/after/ice_screenshot_20250323-203408.png) | Improved |
| **Search for 'Italy'** | ![](./src/assets/search_by_name/before/ice_screenshot_20250323-184442.png) <br> ![](./src/assets/search_by_name/before/ice_screenshot_20250323-184530.png) | ![](./src/assets/search_by_name/after/ice_screenshot_20250323-203444.png) <br> ![](./src/assets/search_by_name/after/ice_screenshot_20250323-203412.png) | Improved |

### 4. Performance Analysis of Filtering Countries by Region (Africa)

| Action                         | Before Optimization (Time, Render Duration, Committed at)                                                                                                      | After Optimization (Time, Render Duration, Committed at)                                                                                                     | Change   |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| **Filter by Region (Africa)**  | ![](./src/assets/filter_by_region/before/ice_screenshot_20250323-184806.png) <br> ![](./src/assets/filter_by_region/before/ice_screenshot_20250323-184822.png) | ![](./src/assets/filter_by_region/after/ice_screenshot_20250323-204424.png) <br> ![](./src/assets/filter_by_region/after/ice_screenshot_20250323-204306.png) | Improved |
| **Reset Filter (All Regions)** | ![](./src/assets/filter_by_region/before/ice_screenshot_20250323-184813.png) <br> ![](./src/assets/filter_by_region/before/ice_screenshot_20250323-184828.png) | ![](./src/assets/filter_by_region/after/ice_screenshot_20250323-204255.png) <br> ![](./src/assets/filter_by_region/after/ice_screenshot_20250323-204323.png) | Improved |
