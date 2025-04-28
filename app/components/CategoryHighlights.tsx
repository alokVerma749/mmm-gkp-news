export function CategoryHighlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white border border-gray-200 shadow-sm p-4">
        <h3 className="border-b-2 border-blue-600 pb-2 text-lg font-bold font-serif mb-4">
          Academic Updates
        </h3>
        <ul className="space-y-3">
          <li className="pb-3 border-b border-gray-100">
            <a href="#" className="hover:text-blue-600 transition-colors">
              <h4 className="font-medium">New Research Collaboration with IIT Kanpur Announced</h4>
              <p className="text-sm text-gray-600 mt-1">Expanding opportunities for joint research projects</p>
            </a>
          </li>
          <li className="pb-3 border-b border-gray-100">
            <a href="#" className="hover:text-blue-600 transition-colors">
              <h4 className="font-medium">Fall Semester Registration Begins Next Week</h4>
              <p className="text-sm text-gray-600 mt-1">Students advised to check eligibility criteria</p>
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600 transition-colors">
              <h4 className="font-medium">Faculty Development Program on AI Applications</h4>
              <p className="text-sm text-gray-600 mt-1">Three-day workshop scheduled for next month</p>
            </a>
          </li>
        </ul>
      </div>
      
      <div className="bg-white border border-gray-200 shadow-sm p-4">
        <h3 className="border-b-2 border-green-600 pb-2 text-lg font-bold font-serif mb-4">
          Campus Life
        </h3>
        <ul className="space-y-3">
          <li className="pb-3 border-b border-gray-100">
            <a href="#" className="hover:text-blue-600 transition-colors">
              <h4 className="font-medium">Annual Cultural Festival Dates Announced</h4>
              <p className="text-sm text-gray-600 mt-1">Three days of performances, competitions and celebrations</p>
            </a>
          </li>
          <li className="pb-3 border-b border-gray-100">
            <a href="#" className="hover:text-blue-600 transition-colors">
              <h4 className="font-medium">New Student Union Representatives Elected</h4>
              <p className="text-sm text-gray-600 mt-1">Record turnout in this years elections</p>
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600 transition-colors">
              <h4 className="font-medium">Campus Sustainability Initiative Launches</h4>
              <p className="text-sm text-gray-600 mt-1">Student-led effort to reduce carbon footprint</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
