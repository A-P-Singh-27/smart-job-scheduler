import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Dummy historical scheduler data
data = {
    "burstTime": [5, 3, 8, 6, 2, 4],
    "priority": [2, 1, 3, 2, 1, 2],
    "executionTime": [5, 3, 9, 6, 2, 4]
}

df = pd.DataFrame(data)

X = df[["burstTime", "priority"]]
y = df["executionTime"]

model = LinearRegression()
model.fit(X, y)

joblib.dump(model, "model.pkl")

print("✅ Regression model trained and saved")
