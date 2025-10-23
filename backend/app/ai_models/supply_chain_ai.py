import numpy as np
import pandas as pd
from typing import List, Dict, Any
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib
import os

class SupplyChainAI:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
        self.demand_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.supplier_similarity_matrix = None
        self.is_trained = False
        
    def train_supplier_matching(self, suppliers_data: List[Dict[str, Any]]):
        """
        Train supplier matching model based on historical data
        """
        if not suppliers_data:
            return
            
        # Extract features for supplier matching
        supplier_descriptions = []
        supplier_categories = []
        
        for supplier in suppliers_data:
            description = f"{supplier.get('company_name', '')} {supplier.get('business_type', '')} {supplier.get('description', '')}"
            supplier_descriptions.append(description)
            supplier_categories.append(supplier.get('category', 'general'))
        
        # Create TF-IDF vectors
        tfidf_matrix = self.vectorizer.fit_transform(supplier_descriptions)
        
        # Calculate similarity matrix
        self.supplier_similarity_matrix = cosine_similarity(tfidf_matrix)
        
        self.is_trained = True
        
    def get_supplier_recommendations(self, buyer_profile: Dict[str, Any], top_n: int = 5) -> List[Dict[str, Any]]:
        """
        Get AI-powered supplier recommendations for a buyer
        """
        if not self.is_trained:
            return []
            
        # Extract buyer preferences
        buyer_description = f"{buyer_profile.get('company_name', '')} {buyer_profile.get('business_type', '')} {buyer_profile.get('description', '')}"
        
        # Transform buyer description
        buyer_vector = self.vectorizer.transform([buyer_description])
        
        # Calculate similarities
        similarities = cosine_similarity(buyer_vector, self.vectorizer.transform(supplier_descriptions))
        
        # Get top recommendations
        top_indices = np.argsort(similarities[0])[-top_n:][::-1]
        
        recommendations = []
        for idx in top_indices:
            recommendations.append({
                'supplier_id': idx,
                'similarity_score': float(similarities[0][idx]),
                'recommendation_reason': f"High compatibility based on business type and requirements"
            })
            
        return recommendations
    
    def train_demand_forecasting(self, historical_data: List[Dict[str, Any]]):
        """
        Train demand forecasting model
        """
        if not historical_data:
            return
            
        # Prepare features for demand forecasting
        df = pd.DataFrame(historical_data)
        
        # Feature engineering
        features = ['product_category', 'season', 'month', 'previous_demand']
        X = df[features]
        y = df['demand']
        
        # Train model
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.demand_model.fit(X_train, y_train)
        
    def forecast_demand(self, product_info: Dict[str, Any]) -> Dict[str, Any]:
        """
        Forecast demand for a product
        """
        if not self.is_trained:
            return {'forecast': 0, 'confidence': 0}
            
        # Prepare features
        features = np.array([[
            product_info.get('category', 0),
            product_info.get('season', 0),
            product_info.get('month', 0),
            product_info.get('previous_demand', 0)
        ]])
        
        # Make prediction
        forecast = self.demand_model.predict(features)[0]
        
        # Calculate confidence (simplified)
        confidence = min(0.95, max(0.5, 1.0 - abs(forecast - product_info.get('previous_demand', 0)) / max(forecast, 1)))
        
        return {
            'forecast': int(forecast),
            'confidence': float(confidence),
            'trend': 'increasing' if forecast > product_info.get('previous_demand', 0) else 'decreasing'
        }
    
    def calculate_supplier_score(self, supplier_data: Dict[str, Any], order_history: List[Dict[str, Any]]) -> float:
        """
        Calculate AI-powered supplier score based on multiple factors
        """
        score = 0.0
        
        # Rating factor (40%)
        rating = supplier_data.get('rating', 0)
        score += rating * 0.4
        
        # Order completion rate (30%)
        if order_history:
            completed_orders = sum(1 for order in order_history if order.get('status') == 'delivered')
            completion_rate = completed_orders / len(order_history)
            score += completion_rate * 0.3
        
        # Response time factor (20%)
        avg_response_time = supplier_data.get('avg_response_time', 24)  # hours
        response_score = max(0, 1 - (avg_response_time - 1) / 48)  # Normalize to 0-1
        score += response_score * 0.2
        
        # Quality factor (10%)
        quality_score = supplier_data.get('quality_score', 0.8)
        score += quality_score * 0.1
        
        return min(1.0, max(0.0, score))
    
    def save_model(self, filepath: str):
        """
        Save trained models to disk
        """
        model_data = {
            'vectorizer': self.vectorizer,
            'demand_model': self.demand_model,
            'supplier_similarity_matrix': self.supplier_similarity_matrix,
            'is_trained': self.is_trained
        }
        joblib.dump(model_data, filepath)
    
    def load_model(self, filepath: str):
        """
        Load trained models from disk
        """
        if os.path.exists(filepath):
            model_data = joblib.load(filepath)
            self.vectorizer = model_data['vectorizer']
            self.demand_model = model_data['demand_model']
            self.supplier_similarity_matrix = model_data['supplier_similarity_matrix']
            self.is_trained = model_data['is_trained']

# Global AI instance
ai_service = SupplyChainAI()
