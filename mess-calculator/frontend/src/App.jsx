import React, { useState } from 'react';
import './App.css';

function App() {
  const [members, setMembers] = useState([]);
  
  const [name, setName] = useState('');
  const [bazarCost, setBazarCost] = useState('');
  const [riceCost, setRiceCost] = useState('');
  const [totalMeal, setTotalMeal] = useState('');
  const [roomRent, setRoomRent] = useState('');

  const [utility, setUtility] = useState({
    gasBill: 0,
    electricityBill: 0,
    liftBill: 0,
    wifiBill: 0,
    khalaBill: 0,
    garbageBill: 0,
  });

  const handleAddMember = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      alert('মেম্বারের নাম ফাঁকা রাখা যাবে না!');
      return;
    }

    const exists = members.find((m) => m.name.toLowerCase() === trimmedName.toLowerCase());
    if (exists) {
      alert(`সতর্কতা: '${trimmedName}' নামের মেম্বার ইতিমধ্যেই যুক্ত আছে!`);
      return;
    }

    const newMember = {
      id: Date.now(),
      name: trimmedName,
      bazarCost: parseFloat(bazarCost) || 0,
      riceCost: parseFloat(riceCost) || 0,
      totalMeal: parseFloat(totalMeal) || 0,
      roomRent: parseFloat(roomRent) || 0,
    };

    setMembers([...members, newMember]);
    setName('');
    setBazarCost('');
    setRiceCost('');
    setTotalMeal('');
    setRoomRent('');
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleUtilityChange = (e) => {
    const { name, value } = e.target;
    setUtility({
      ...utility,
      [name]: parseFloat(value) || 0,
    });
  };

  const totalMembers = members.length;
  const totalBazarCost = members.reduce((sum, m) => sum + m.bazarCost, 0);
  const totalRiceCost = members.reduce((sum, m) => sum + m.riceCost, 0);
  const totalMealCost = totalBazarCost + totalRiceCost;
  const subTotalMeal = members.reduce((sum, m) => sum + m.totalMeal, 0);

  const mealRate = subTotalMeal > 0 ? totalMealCost / subTotalMeal : 0;

  const totalUtilityCost =
    utility.gasBill +
    utility.electricityBill +
    utility.liftBill +
    utility.wifiBill +
    utility.khalaBill +
    utility.garbageBill;

  const perPersonUtilityCost = totalMembers > 0 ? totalUtilityCost / totalMembers : 0;

  return (
    <div className="container">
      <h1>মেস মিল ও বিল ব্যবস্থাপনা</h1>

      <div className="card">
        <h2>১. মেম্বার যুক্ত করুন</h2>
        <form onSubmit={handleAddMember} className="form-grid">
          <div>
            <label>মেম্বারের নাম:</label>
            <input type="text" placeholder="নাম" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>বাজার খরচ (৳):</label>
            <input type="number" placeholder="০" value={bazarCost} onChange={(e) => setBazarCost(e.target.value)} />
          </div>
          <div>
            <label>চাল খরচ (৳):</label>
            <input type="number" placeholder="০" value={riceCost} onChange={(e) => setRiceCost(e.target.value)} />
          </div>
          <div>
            <label>মোট মিল:</label>
            <input type="number" placeholder="০" value={totalMeal} onChange={(e) => setTotalMeal(e.target.value)} />
          </div>
          <div>
            <label>রুম রেন্ট (৳):</label>
            <input type="number" placeholder="০" value={roomRent} onChange={(e) => setRoomRent(e.target.value)} />
          </div>
          <button type="submit" className="btn-add">যোগ করুন</button>
        </form>
      </div>

      <div className="card">
        <h2>২. ইউটিলিটি বিলের তথ্য</h2>
        <div className="form-grid">
          <div><label>গ্যাস বিল:</label><input type="number" name="gasBill" onChange={handleUtilityChange} placeholder="০" /></div>
          <div><label>বিদ্যুৎ বিল:</label><input type="number" name="electricityBill" onChange={handleUtilityChange} placeholder="০" /></div>
          <div><label>লিফটের বিল:</label><input type="number" name="liftBill" onChange={handleUtilityChange} placeholder="০" /></div>
          <div><label>ওয়াইফাই বিল:</label><input type="number" name="wifiBill" onChange={handleUtilityChange} placeholder="০" /></div>
          <div><label>খালা/বুয়ার বিল:</label><input type="number" name="khalaBill" onChange={handleUtilityChange} placeholder="০" /></div>
          <div><label>ময়লার বিল:</label><input type="number" name="garbageBill" onChange={handleUtilityChange} placeholder="০" /></div>
        </div>
      </div>

      <div className="card summary-card">
        <h2>৩. মেস ওভারভিউ</h2>
        <div className="summary-grid">
          <p>মোট মেম্বার: <strong>{totalMembers} জন</strong></p>
          <p>মোট বাজার খরচ: <strong>{totalBazarCost.toFixed(2)} ৳</strong></p>
          <p>মোট চাল খরচ: <strong>{totalRiceCost.toFixed(2)} ৳</strong></p>
          <p>সব মেম্বারের মোট মিল খরচ: <strong>{totalMealCost.toFixed(2)} ৳</strong></p>
          <p>সর্বমোট মিল: <strong>{subTotalMeal} টি</strong></p>
          <p className="highlight">মিল রেট: <strong>{mealRate.toFixed(2)} ৳</strong></p>
          <p>মোট ইউটিলিটি খরচ: <strong>{totalUtilityCost.toFixed(2)} ৳</strong></p>
          <p>জনপ্রতি ইউটিলিটি খরচ: <strong>{perPersonUtilityCost.toFixed(2)} ৳</strong></p>
        </div>
      </div>

      {members.length > 0 && (
        <div className="card">
          <h2>৪. চূড়ান্ত ফলাফল</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>মেম্বারের নাম</th>
                  <th>বাজার ও চাল মোট জমা</th>
                  <th>মিল সংখ্যা</th>
                  <th>খাবারের খরচ</th>
                  <th>খাবার + ইউটিলিটি খরচ</th>
                  <th>রুম রেন্ট</th>
                  <th>আর্থিক অবস্থান</th>
                  <th>অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => {
                  const totalCost = m.bazarCost + m.riceCost;
                  const perMealCost = m.totalMeal * mealRate;
                  const mealPlusUtility = perMealCost + perPersonUtilityCost;
                  const rawFinancialPosition = totalCost - (mealPlusUtility + m.roomRent);

                  let ceilingValue = 0;
                  if (rawFinancialPosition > 0) {
                    ceilingValue = Math.ceil(rawFinancialPosition);
                  } else if (rawFinancialPosition < 0) {
                    ceilingValue = Math.floor(rawFinancialPosition);
                  }

                  return (
                    <tr key={m.id}>
                      <td><strong>{m.name}</strong></td>
                      <td>{totalCost.toFixed(2)} ৳</td>
                      <td>{m.totalMeal}</td>
                      <td>{perMealCost.toFixed(2)} ৳</td>
                      <td>{mealPlusUtility.toFixed(2)} ৳</td>
                      <td>{m.roomRent.toFixed(2)} ৳</td>
                      <td className={ceilingValue >= 0 ? 'status-green' : 'status-red'}>
                        {ceilingValue >= 0
                          ? `পাবে: ${ceilingValue} ৳`
                          : `দেবে: ${Math.abs(ceilingValue)} ৳`}
                        <span className="ceil-badge">
                          (প্রকৃত: {rawFinancialPosition.toFixed(2)} ৳)
                        </span>
                      </td>
                      <td>
                        <button onClick={() => handleRemoveMember(m.id)} className="btn-delete">
                          মুছে ফেলুন
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ৫. ফুটার সেকশন (Developer Info & Copyright) */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Mess Management System. All rights reserved.</p>
        <p>Developed by <strong>Md Rokibul Islam Chonchol</strong></p>
        <p>
          📞 Phone: <a href="tel:01522117752">01522117752</a> | 
          ✉️ Email: <a href="mailto:mdrokibulIslam7752@gmail.com">mdrokibulIslam7752@gmail.com</a>
        </p>
      </footer>
    </div>
  );
}

export default App;