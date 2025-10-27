import React, { useState } from 'react';
import { Search, MapPin, Calendar, Briefcase, DollarSign, Globe, Users, Filter, Loader2 } from 'lucide-react';

interface JobSearchForm {
  keyword: string;
  location: string;
  dateSincePosted: string;
  jobType: string;
  remoteFilter: string;
  salary: string;
  experienceLevel: string;
  limit: string;
  sortBy: string;
  has_verification: boolean;
  under_10_applicants: boolean;
}

interface Job{
  position: string;         // Position title
  company: string;          // Company name
  companyLogo?: string;     // Company Logo (optional if not always present)
  location: string;         // Location of the job
  date: string;             // Date the job was posted
  agoTime?: string;         // Time since it was posted (optional if not always present)
  salary?: string;          // Salary range
  jobUrl: string;           // URL of the job page
}


export default function JobSearchPage() {
  const [formData, setFormData] = useState<JobSearchForm>({
    keyword: '',
    location: '',
    dateSincePosted: 'past week',
    jobType: 'full time',
    remoteFilter: 'on site',
    salary: '40000',
    experienceLevel: 'entry level',
    limit: '10',
    sortBy: 'recent',
    has_verification: false,
    under_10_applicants: false,
  });

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async () => {
  setLoading(true);
  setError('');

  try {
    // Call your Next.js API proxy
    const response = await fetch('https://dev-journey-zeta.vercel.app/api/jobsPoxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: formData.keyword,
        location: formData.location,
        dateSincePosted: formData.dateSincePosted,
        jobType: formData.jobType,
        remoteFilter: formData.remoteFilter,
        salary: formData.salary,
        experienceLevel: formData.experienceLevel,
        limit: formData.limit,
        page: "0",
        has_verification: formData.has_verification,
        under_10_applicants: formData.under_10_applicants,
        sortBy: formData.sortBy,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.jobs && Array.isArray(data.jobs)) {
      setJobs(data.jobs);
    } else {
      setJobs([]);
    }

    // Log for debugging
    console.log('API Response:', data);
    
  } catch (err: any) {
    console.error('Error fetching jobs:', err);
    setError(err.message || 'Failed to fetch jobs. Please try again.');
    setJobs([]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="h-screen bg-darkBlue-custom overflow-auto mr-3">
      <div className="  mx-auto py-8">
        <div className=" mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-gray-400">
              Search thousands of opportunities with advanced filters
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-cardBlue-custom rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-6">
              {/* Primary Search Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <Search className="w-4 h-4 mr-2 text-indigo-500" />
                    Keywords
                  </label>
                  <input
                    type="text"
                    name="keyword"
                    value={formData.keyword}
                    onChange={handleInputChange}
                    placeholder="e.g. Software Engineer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-800 "
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. New York, NY"
                    className="w-full  bg-gray-800 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Filter Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                    Date Posted
                  </label>
                  <select
                    name="dateSincePosted"
                    value={formData.dateSincePosted}
                    onChange={handleInputChange}
                    className="w-full px-4 text-gray-400  bg-gray-800 py-3  border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="past month">Past Month</option>
                    <option value="past week">Past Week</option>
                    <option value="24hr">24 Hours</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <Briefcase className="w-4 h-4 mr-2 text-indigo-500" />
                    Job Type
                  </label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-gray-400 bg-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="full time">Full Time</option>
                    <option value="part time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="temporary">Temporary</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <Globe className="w-4 h-4 mr-2 text-indigo-500 " />
                    Remote
                  </label>
                  <select
                    name="remoteFilter"
                    value={formData.remoteFilter}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border text-gray-400 bg-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="on site">On Site</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <DollarSign className="w-4 h-4 mr-2 text-indigo-500" />
                    Min Salary
                  </label>
                  <select
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-gray-400 bg-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="40000">$40,000+</option>
                    <option value="60000">$60,000+</option>
                    <option value="80000">$80,000+</option>
                    <option value="100000">$100,000+</option>
                    <option value="120000">$120,000+</option>
                  </select>
                </div>
              </div>

              {/* Advanced Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <Users className="w-4 h-4 mr-2 text-indigo-500" />
                    Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 text-gray-400 bg-gray-800 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="internship">Internship</option>
                    <option value="entry level">Entry Level</option>
                    <option value="associate">Associate</option>
                    <option value="senior">Senior</option>
                    <option value="director">Director</option>
                    <option value="executive">Executive</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-white">
                    <Filter className="w-4 h-4 mr-2 text-indigo-500" />
                    Results Limit
                  </label>
                  <select
                    name="limit"
                    value={formData.limit}
                    onChange={handleInputChange}
                    className="w-full text-gray-400 bg-gray-800 focus:bg-gray-800 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="10">10 Jobs</option>
                    <option value="25">25 Jobs</option>
                    <option value="50">50 Jobs</option>
                    <option value="100">100 Jobs</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Sort By</label>
                  <select
                    name="sortBy"
                    value={formData.sortBy}
                    onChange={handleInputChange}
                    className="w-full px-4 text-gray-400 bg-gray-800 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="relevant">Most Relevant</option>
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="has_verification"
                    checked={formData.has_verification}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-white border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-white">Verified Companies Only</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="under_10_applicants"
                    checked={formData.under_10_applicants}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-white border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-white">Under 10 Applicants</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Search Jobs</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Results */}
          {jobs.length > 0 && (
            <div className=" rounded-2xl shadow-xl py-4 pb-20">
              <h2 className="text-2xl font-bold text-white mb-6">
                Search Results ({jobs.length} jobs found)
              </h2>
              <div className="grid grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-3 gap-3">
                {jobs.map((job, index) => (
                  <div
                    key={index}
                    className=" rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 bg-cardBlue-custom"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                          {job.companyLogo && (
        <img
          src={job.companyLogo}                  // URL from API
          alt={`${job.company} logo`}            // accessible alt text
          className="w-10 h-10 rounded object-contain" // adjust size/style
        />
      )}
                        <h3 className="text-lg font-semibold text-white hover:text-indigo-600 cursor-pointer transition-colors duration-200">
                          {job.company}
                        </h3>
                       
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {job.date}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <MapPin className="w-4 h-4 mr-1 text-indigo-500" />
                      {job.location}
                    </div>
                   
                    <div className="flex space-x-3">
                      <a
  href={job.jobUrl}          // ← your job URL here
  target="_blank"            // optional: open in new tab
  rel="noopener noreferrer"  // security best practice
  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm transition-colors duration-200 flex items-center space-x-2"
>
  <span>View Details</span>
</a>
                     
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Load More Button */}
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}