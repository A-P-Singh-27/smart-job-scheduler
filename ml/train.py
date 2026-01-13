import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

# Training data with ALGORITHM feature
data = {
    "burstTime": [5, 5, 5, 3, 3, 3, 8, 8, 8],
    "priority":  [2, 2, 2, 1, 1, 1, 3, 3, 3],
    "algorithm": [0, 1, 2, 0, 1, 2, 0, 1, 2],  # 0=FCFS,1=SJF,2=Priority
    "waitingTime": [6, 1, 4, 2, 0, 1, 10, 3, 7]
}

df = pd.DataFrame(data)

X = df[["burstTime", "priority", "algorithm"]]
y = df["waitingTime"]

model = LinearRegression()
model.fit(X, y)

joblib.dump(model, MODEL_PATH)

print("✅ Model retrained with 3 features (burst, priority, algorithm)")
