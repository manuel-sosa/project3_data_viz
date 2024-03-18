<p align="center">
  <img width="400" height="400" src="https://github.com/manuel-sosa/project3_data_viz/blob/main/07_Miscellaneous/cali-map.png">
</p>

# Project 3: Hospital and Healthcare System Location and Financial Information Analysis :bar_chart: :hospital:

## Summary
In this project, we aim to provide insightful location and financial information analysis through interactive databases and data visualizations, utilizing a combination of **Python and JavaScript libraries**. 

We evaluate the revenue mix of hospitals in California, **analyzing data from both the largest and smallest hospitals based on the size of their total assets**. Through this analysis, we aim to uncover trends and insights that can inform the user about the current healthcare system operations in California.

## Table of Contents
1. [Summary](#summary)
2. [Purpose](#purpose)
3. [Key Objectives](#key-objectives)
4. [Tech Stack](#tech-stack)
5. [Data Sources](#data-sources)
6. [Notebook/Script](#notebookscript)
7. [Instructions](#instructions)
8. [Visualizations](#visualizations)
9. [Ethical Considerations](#ethical-considerations)
10. [Data Limitations](#data-limitations) 
11. [Conclusions](#conclusions)

## Purpose
The purpose of this project is to **leverage interactive data visualization tools and libraries** to evaluate the revenue mix of California-based hospitals and healthcare systems' location and financial information. By integrating technologies and methods not previously covered in class, we aim to **expand our technical repertoire and provide users with interactive and insightful experiences**.

**We aim to answer these three basic questions found in the data:**
1. Where are the *10 largest and 10 smallest hospitals and healthcare systems located*?

2. What is the mix of *pay type*? 

3. What is the breakdown of *type of care*?

## Key Objectives
- To *create interactive data visualizations* using a mix of Python and JavaScript libraries.
- To *utilize one database technology* for data storage and extraction.
- To include user-driven interactions for a *dynamic visualization experience*.
- To ensure our visualizations are powered by a dataset containing at least *100 records*.
- To showcase *three different views in our final visualization* to provide comprehensive insights.
- Key Findings.

## Tech Stack
| Tech Sack | Usage |
| ------------- | ------------- |
|![image](https://github.com/manuel-sosa/project3_data_viz/blob/main/07_Miscellaneous/javascript.png)  | Interactive web pages |
| ![image](https://github.com/manuel-sosa/project3_data_viz/blob/main/07_Miscellaneous/pandas.png) | Data analysis for Python  |
| ![image](https://github.com/manuel-sosa/project3_data_viz/blob/main/07_Miscellaneous/plotly.png) | Interactive online graphing library  |
| ![image](https://github.com/manuel-sosa/project3_data_viz/blob/main/07_Miscellaneous/node.js.png) | Web development (not shown in class) |
| ![image](https://github.com/manuel-sosa/project3_data_viz/blob/main/07_Miscellaneous/leaflet.png) | Interactive maps JavaScript library |
| ![image](https://github.com/manuel-sosa/project3_data_viz/blob/main/07_Miscellaneous/postgresql-logo2.png) | Object-relational database system |

## Data Sources
Our dataset comprises over **400 records** focusing on hospital revenue mix in California reported in 2022. The data is stored and managed using PostgreSQL.

| Data Source  | Usage |
| ------------- | ------------- |
| [Hospital Annual Financial Data - State of California](https://catalog.data.gov/dataset/hospital-annual-financial-data-selected-data-pivot-tables-a3e84)  | Individual hospitals and healthcare systems facility-level data |

## Notebook/Script
Included in this repository are **Jupyter Notebooks and/or command-line JavaScripts** that detail our data processing, analysis, and visualization creation steps. Each script is documented to explain the processes and methodologies applied.

## Instructions
**10 largest and 10 smallest hospitals and healthcare systems by total revenue located in California**
*- Interactive Map -*
- Interaction: Users can click on the markers to see more details about each hospital. The red markers indicate the 10 smallest hospitals by revenue, while the green markers indicate the largest hospitals by revenue.

**Net Patient Revenue by Payer Category: Pay Type Mix, % and by Facility, %**
*- Interactive Pie Charts -*

- Interaction: Users can hover over or click on the segments to see more detailed information. In this case, it shows the percentage of revenue that comes from different types of payers, textboxes are displayed over the visualizations.

**Type of care provided breakdown**
*- Interactive Bar Chart -*

- Interaction: Users can select a facility from the dropdown menu, and the bar chart will update to show the data for that specific location. the chart shows the types of care like 'Acute', 'Psychiatric', etc., and the user can hover over the bars to see the exact numbers of patients discharged.

## Visualizations
### 1. Where are the *10 largest and 10 smallest hospitals and healthcare systems by total revenue located in California*?
![image](https://github.com/manuel-sosa/project3_data_viz/blob/main/07_Miscellaneous/hospitals-map.png)

### 2. What is the mix of *Net Patient Revenue by Payer Category: Pay Type Mix, % and by Facility*? 
![image](https://github.com/manuel-sosa/project3_data_viz/blob/main/07_Miscellaneous/pay-type-mix.png)

![image](https://github.com/manuel-sosa/project3_data_viz/blob/main/07_Miscellaneous/pay-type-mix-by-facility.png)

### 3. What is the breakdown of *type of care provided*?
![image](https://github.com/manuel-sosa/project3_data_viz/blob/main/07_Miscellaneous/type-of-care.png)

## Ethical Considerations
The dataset employed for our analysis is an **open dataset publicly available through the Department of Health Care Access and Information of California**, which ensures transparency and accessibility. It is composed of comprehensive annual reports by hospitals and hospital systems, detailing facility-level data across a spectrum of metrics, including service capacity, utilization patterns and financial statements.

**Importantly, our dataset does not contain any Protected Health Information (PHI) or personally identifiable information (PII), adhering to the Health Insurance Portability and Accountability Act (HIPAA) in the United States**. This deliberate exclusion of sensitive data underscores our commitment to maintaining the confidentiality and integrity of individual health information.

## Data Limitations
**Lack of Comparative Data by years:**
The data represents one specific year, 2022. Without time-based data, it's challenging to discern trends, assess progress, or make year-over-year comparisons.

**Potential for Misinterpretation:**
The charts do not provide understanding on the underlying factors, such as policy changes or patient demographics, that could affect both net revenue and total asset size.

## Conclusion
