# Phishing-Detection-Web
This project aims to develop a machine learning based phishing detection platform that can identify malicious websites through multiple security analysis techniques such as visual detection, homograph attack detection and domain intelligence analysis, which then collect the analysis results to generate phishing statistics and threat trends overtime

Expected outcomes: A fully functional phishing detection web platform that implements ML techniques for phishing classification, integrating advanced phishing detection, and a security dashboard that can collect and display phishing detection results and analysis reports.

Used Methods and Techniques:
Machine Learning Techniques
•	Supervised learning algorithms such as Random Forest or Gradient Boosting for phishing URL classification
•	Feature extraction from URL structure, webpage content, and domain metadata
•	Model evaluation using metrics such as accuracy, precision, recall, and F1-score
Visual Similarity Detection
•   
•	Website screenshot collection and preprocessing
•	Image similarity analysis using computer vision techniques like CNN to detect cloned websites that mimic legitimate services
Homograph Attack Detection
•	Unicode normalization and domain name parsing
•	Character set analysis to detect domain spoofing and visually similar characters used in homograph attacks
Domain Intelligence Analysis
•	Retrieval of domain metadata through WHOIS and DNS queries
•	Analysis of domain age, registration information, and SSL certificate data to assess domain trustworthiness
Front- end
   React for its component-based architecture, large libraries for data visualization and UI development
Back-end
   Python FastAPI is chosen for its high performance and support of asynchronous processing, integration with Python – based machine learning libraries
Database
   PostgreSQL for its strong support for structured data storage and complex queries, suitable for generating phishing statistics and trends analysis

