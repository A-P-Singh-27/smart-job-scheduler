import joblib
import sys
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

model = joblib.load(MODEL_PATH)

burst = float(sys.argv[1])
priority = float(sys.argv[2])

prediction = model.predict([[burst, priority]])
print(float(prediction[0]))
