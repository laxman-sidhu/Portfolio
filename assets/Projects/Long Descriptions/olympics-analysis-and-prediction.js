/* ============================================================
   LONG DESCRIPTION  ·  Olympics Analysis and Prediction
   ------------------------------------------------------------
   Edit the rich-text HTML between the backticks below.
   You can use:  <h2> <h3> <h4> <p> <strong> <em> <a>
                 <ul>/<li>  <ol>/<li>  <blockquote> <code> <pre> <hr>
   The only characters to avoid inside the text are the
   backtick ( ` ) and the sequence  ${  }  .
   The file name, the key below, and the longDesc value in
   projects-config.js must all be the same word:
   "olympics-analysis-and-prediction".
   ============================================================ */
window.LONGDESC = window.LONGDESC || {};
window.LONGDESC["olympics-analysis-and-prediction"] = `
<h3>Overview</h3>
<p>
  <strong>Olympics Analysis and Prediction</strong> is an academic project I built as an
  interactive <em>Streamlit</em> web app on top of 120 years of Olympic data. It turns a large
  historical dataset into something a curious fan, an aspiring athlete or a coach can actually
  explore - combining data analysis, an interactive map, and a medal prediction tool in one place.
</p>

<h4>Data Analysis</h4>
<ul>
  <li>Medal tallies that can be filtered by year and by country.</li>
  <li>Top statistics across editions, host cities, sports, events, nations and athletes.</li>
  <li>Trends over time, such as participating countries and athlete counts per edition.</li>
  <li>Interactive charts built with <em>Plotly</em>.</li>
</ul>

<h4>Interactive Map</h4>
<ul>
  <li>A world medal map where hovering over a country shows the total medals it has won.</li>
  <li>Rendered from real country shapefiles for accurate borders.</li>
</ul>

<h4>Medal Prediction</h4>
<ul>
  <li>I enter an athlete's age, weight, height, gender, country and sport.</li>
  <li>A trained model predicts the medal they are most likely to win - gold, silver, bronze or none.</li>
  <li>Meant as a guide to help athletes and coaches set realistic goals, not a guarantee.</li>
</ul>

<h4>How it works</h4>
<ol>
  <li><strong>Clean</strong> - the raw athlete dataset is preprocessed into tidy tables.</li>
  <li><strong>Explore</strong> - exploratory data analysis surfaces patterns and trends.</li>
  <li><strong>Train</strong> - a logistic regression model is fitted and saved for reuse.</li>
  <li><strong>Serve</strong> - everything is presented through a multi-page Streamlit app.</li>
</ol>

<h4>Tech notes</h4>
<p>
  Built in <code>Python</code> with <code>Streamlit</code>, <code>pandas</code> and
  <code>numpy</code> for the data work, <code>scikit-learn</code> for the model,
  <code>plotly</code> for charts, and <code>folium</code> with <code>geopandas</code> for the
  map. The prediction core is small:
</p>
<pre><code>import joblib

model = joblib.load("model.pkl")
medal = model.predict(athlete_features)[0]   # Gold / Silver / Bronze / None</code></pre>

<blockquote>
  The goal was to make 120 years of Olympic history easy to explore - and to give athletes a
  data-driven sense of what their next Games might hold.
</blockquote>
`;