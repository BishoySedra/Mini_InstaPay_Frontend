import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AccountUsage({ id }) {
  const [accountUsage, setAccountUsage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountUsage = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/reports/account-usage', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAccountUsage(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching account usage:', error);
        toast.error('Failed to fetch account usage. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAccountUsage();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto mt-8 px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-purple-100 rounded w-1/3"></div>
            <div className="space-y-3">
              <div className="h-4 bg-purple-50 rounded"></div>
              <div className="h-4 bg-purple-50 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!accountUsage) {
    return (
      <div className="w-full max-w-md mx-auto mt-8 px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-500 text-center">No account usage data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[500px]">
        <h2 className="text-xl font-semibold text-purple-800 mb-6">
          Account Usage
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-white border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Linked Accounts</p>
                <p className="text-2xl font-semibold text-purple-800 mt-1">
                  {accountUsage.linkedAccounts}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-white border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Transactions</p>
                <p className="text-2xl font-semibold text-purple-800 mt-1">
                  {accountUsage.transactionsCount.toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}