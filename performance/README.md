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

### Performance Analysis of Country Sorting

| Action                        | Before Optimization (Time)                                                                                                                                   | After Optimization (Time)                                                                                                                                  | Change   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **Sort by Name (Ascending)**  | ![](./src/assets/sorting_by_name/before/ice_screenshot_20250323-170405.png) <br> ![](./src/assets/sorting_by_name/before/ice_screenshot_20250323-170426.png) | ![](./src/assets/sorting_by_name/after/ice_screenshot_20250323-200518.png) <br> ![](./src/assets/sorting_by_name/after/ice_screenshot_20250323-200541.png) | Improved |
| **Sort by Name (Descending)** | ![](./src/assets/sorting_by_name/before/ice_screenshot_20250323-170412.png) <br> ![](./src/assets/sorting_by_name/before/ice_screenshot_20250323-170431.png) | ![](./src/assets/sorting_by_name/after/ice_screenshot_20250323-200523.png) <br> ![](./src/assets/sorting_by_name/after/ice_screenshot_20250323-200541.png) | Improved |
| **Reset Sorting**             | ![](./src/assets/sorting_by_name/before/ice_screenshot_20250323-170419.png) <br> ![](./src/assets/sorting_by_name/before/ice_screenshot_20250323-170436.png) | ![](./src/assets/sorting_by_name/after/ice_screenshot_20250323-200528.png) <br> ![](./src/assets/sorting_by_name/after/ice_screenshot_20250323-200545.png) | Improved |

### Performance Analysis of Country Sorting by Population

| Action                          | Before Optimization (Time) | After Optimization (Time) | Change        |
|---------------------------------|----------------------------|---------------------------|---------------|
| **Sort by Population (Ascending)**    | ![](./src/assets/sorting_by_population/before/ice_screenshot_20250323-184159.png) <br> ![](./src/assets/sorting_by_population/before/ice_screenshot_20250323-184222.png) | ![](./src/assets/sorting_by_population/after/ice_screenshot_20250323-202302.png) <br> ![](./src/assets/sorting_by_population/after/ice_screenshot_20250323-202323.png) | Improved       |
| **Sort by Population (Descending)**   | ![](./src/assets/sorting_by_population/before/ice_screenshot_20250323-184205.png) <br> ![](./src/assets/sorting_by_population/before/ice_screenshot_20250323-184226.png) | ![](./src/assets/sorting_by_population/after/ice_screenshot_20250323-202306.png) <br> ![](./src/assets/sorting_by_population/after/ice_screenshot_20250323-202328.png) | Improved       |
| **Reset Sorting**               | ![](./src/assets/sorting_by_population/before/ice_screenshot_20250323-184210.png) <br> ![](./src/assets/sorting_by_population/before/ice_screenshot_20250323-184231.png) | ![](./src/assets/sorting_by_population/after/ice_screenshot_20250323-202311.png) <br> ![](./src/assets/sorting_by_population/after/ice_screenshot_20250323-202332.png) | Improved       |

### Profiling with React Dev Tools Profiler before optimization

#### 3. Search Country by name (Italy):

1. Click on seacrh input field and enter letter 'I'

![](./src/assets/search_by_name/before/ice_screenshot_20250323-184422.png)
![](./src/assets/search_by_name/before/ice_screenshot_20250323-184512.png)

2. Enter letter 't'

![](./src/assets/search_by_name/before/ice_screenshot_20250323-184428.png)
![](./src/assets/search_by_name/before/ice_screenshot_20250323-184517.png)

3. Enter letter 'a'

![](./src/assets/search_by_name/before/ice_screenshot_20250323-184432.png)
![](./src/assets/search_by_name/before/ice_screenshot_20250323-184521.png)

4. Enter letter 'l'

![](./src/assets/search_by_name/before/ice_screenshot_20250323-184437.png)
![](./src/assets/search_by_name/before/ice_screenshot_20250323-184526.png)

5. Enter letter 'y'

![](./src/assets/search_by_name/before/ice_screenshot_20250323-184442.png)
![](./src/assets/search_by_name/before/ice_screenshot_20250323-184530.png)

#### 3. Filter Countries by region (Africa):

1. Click on regions select field and choose 'Africa' region

![](./src/assets/filter_by_region/before/ice_screenshot_20250323-184806.png)
![](./src/assets/filter_by_region/before/ice_screenshot_20250323-184822.png)

2. Click on regions select field and choose 'All' regions (default)

![](./src/assets/filter_by_region/before/ice_screenshot_20250323-184813.png)
![](./src/assets/filter_by_region/before/ice_screenshot_20250323-184828.png)

### Profiling with React Dev Tools Profiler after optimization

