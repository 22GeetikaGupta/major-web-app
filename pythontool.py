import numpy as np
import sys
import math
import matplotlib.pyplot as plt
import pandas as pd 
import mysql.connector
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsRegressor


mydb = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "test",
        database = "majorproject"
    )
mycursor = mydb.cursor()
query = "SELECT ONSITE, `GLASSDOOR RATING`, GENDER, `Year of Experience`, SALARY, SKILL1, SKILL2, SKILL3 FROM prediction;"

results = pd.read_sql_query(query, mydb)
results.to_csv("output.csv", index=False)
df = pd.read_csv('output.csv')
# print(df.head())


query1 = "SELECT DISTINCT SKILL1 FROM PREDICTION";
result1 = pd.read_sql_query(query1, mydb)
query2 = "SELECT DISTINCT SKILL2 FROM PREDICTION";
result2 = pd.read_sql_query(query2, mydb)
query3 = "SELECT DISTINCT SKILL3 FROM PREDICTION";
result3 = pd.read_sql_query(query3, mydb)


unique = set()

unique.add('FEMALE')
unique.add('MALE')
for result in result1.values:
    string = str(result)
    string = string.rstrip("']\"")
    string = string.lstrip("\"['")
    unique.add(string)
for result in result2.values:
    string = str(result)
    string = string.rstrip("']\"")
    string = string.lstrip("\"['")
    unique.add(string)
for result in result3.values:
    string = str(result)
    string = string.rstrip("']\"")
    string = string.lstrip("\"['")
    unique.add(string)

unique = list(unique)

df.fillna(0, inplace=True)


pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)




lst=['FEMALE','MALE','UIPATH', 'REACT.JS', 'JEE', 'ML', 'SQL','DATA SCIENCE', 'CLOUD SERVICES', 'NETWORKING', 'DEEP LEARNING', 'KOTLIN', 'DEVOPS', 'NODE.JS', 'SONICWALL', 'SPRINGBOOT', 'TESTING', 'CSS', 'JAVA SCRIPT', '.NET', 'SWIFT', 'DOCKER', 'HTML', 'SHAREPOINT', 'VUE.JS', 'PHP', 'IOS', 'RECRUITING', 'HEADHUNTING', 'AGILE', 'C', 'LINUX', 'FORTIGATE', 'OBJECT ORIENTED DESIGN', 'WEB DEVELOPMENT', 'UX', 'JAVA', 'FLUTTER', 'COMPUTER HARDWARE', 'HIBERNATE', 'SALESFORCE', 'GROOVY', 'VMWARE', 'BLUEPRISM', 'REST API', 'REDIS', 'ORACLE FINANCE CLOUD', 'HADOOP', 'CMS', 'JSON', 'UNIX', 'PYTHON', 'WINDOWS', 'CYBERSECURITY', 'BIT BUCKET', 'SPRING', 'C++', 'MVC', 'API INTEGRATION', 'SYSTEM ADMINISTRATION', 'JQUERY', 'REACT NATIVE', 'ANGULAR', 'KAFKA', 'MYSQL', 'JAVASCRIPT', 'ORACLE ERP FINANCE', 'ASP.NET', 'MICROSERVICES', 'MONGODB', 'ORACLE DBA', 'CONFIGURING', 'PL/SQL', 'ANDROID', 'AWS', 'ORACLE']
mapping={}
x=100
for i in unique:
    mapping[i]=x
    x=x+1;  
       
def handle_non_numerical_data(df):
    columns = df.columns.values
    for column in columns:
        
        if df[column].dtype != np.int64 and df[column].dtype != np.float64:
            def addition(n):
                return mapping.get(str(n))

            df[column]=list(map(addition,df[column]))
            
            
    return df

# print("printing first data frame...", df)
df = handle_non_numerical_data(df)
# print(df.head())
# print(df.isnull().values.any())
df = df.dropna()
# print(df.isnull().values.any())
# print(df.head())

train_set, test_set = train_test_split(df, test_size = 0.2, random_state = 1)
X_train = train_set.iloc[:,[0,1,2,3,5,6,7]]
#.values.reshape(-1, 1)
y_train = train_set.iloc[:,4].values
X_test = test_set.iloc[:,[0,1,2,3,5,6,7]]
#.values.reshape(-1, 1)
y_test = test_set.iloc[:,4].values
regressor = KNeighborsRegressor(n_neighbors=7, weights='distance', algorithm='auto', leaf_size=30, p=2, metric='euclidean', metric_params=None, n_jobs=None)

#regressor = KNeighborsRegressor(n_neighbors =5, metric = 'minkowski', p = 2)
onsite = int(sys.argv[1])
glassdoor_rating = float(sys.argv[2])
gender = sys.argv[3].strip()
yoe = int(sys.argv[4])
skill1 = sys.argv[5].strip()
skill2 = sys.argv[6].strip()
skill3 = sys.argv[7].strip()

test_ex = [[onsite,glassdoor_rating, gender,yoe,skill1,skill2,skill3]]
test1 = pd.DataFrame(test_ex)
test2 = handle_non_numerical_data(test1);

regressor.fit(X_train, y_train)

y_pred = regressor.predict(X_test)

test_set['Predicted_Salary'] = y_pred

ans = regressor.predict(test2)
ans = math.floor(int(ans))
ans = round(ans, -5)
print(ans-100000, ' to ', ans+100000)



# plt.figure(figsize = (10,10))
# plt.title('Actual vs Predicted Salary')
# plt.xlabel('Skills')
# plt.ylabel('Salary')
# plt.legend()

# plt
# plt.plot(range(0, 100000))

 

# scale_factor = 7

# import plotly.express as px
# df = px.data.tips()
# fig = px.scatter(df, x="SALARY", y="Predicted_Salary", color="Year of Experience")
# fig.show()
# #xmin, xmax = plt.xlim()
# ymin, ymax = plt.ylim()
# #plt.xlim(xmin * scale_factor, xmax * scale_factor)
# plt.ylim(ymin * scale_factor, ymax * scale_factor)


# plt.scatter(list(test_set["Year of Experience"]),list(test_set["SALARY"]))
# plt.scatter(list(test_set["Year of Experience"]),list(test_set["Predicted_Salary"]))
# plt.show()