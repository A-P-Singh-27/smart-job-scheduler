import joblib
import sys

model = joblib.load("model.pkl")

burst = float(sys.argv[1])
priority = float(sys.argv[2])

prediction = model.predict([[burst, priority]])
print(float(prediction[0]))
