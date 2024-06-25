
const DashboardPage = () => {
  return (
    <div className="flex h-full bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium mb-4">Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

              <div className="bg-white rounded-md shadow-md p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Wedding Statistics</h4>
                <div className="flex items-center justify-between">
                  <div className="text-gray-600">Total Weddings</div>
                  <div className="text-gray-900 font-bold">25</div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-gray-600">Total Photos</div>
                  <div className="text-gray-900 font-bold">5000</div>
                </div>
              </div>

              <div className="bg-white rounded-md shadow-md p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">User Statistics</h4>
                <div className="flex items-center justify-between">
                  <div className="text-gray-600">Total Users</div>
                  <div className="text-gray-900 font-bold">1000</div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-gray-600">Active Users</div>
                  <div className="text-gray-900 font-bold">750</div>
                </div>
              </div>

              <div className="bg-white rounded-md shadow-md p-6 col-span-2">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Recent Queries</h4>
                <ul className="divide-y divide-gray-200">
                  <li className="py-2">
                    <div className="text-gray-800 font-semibold">Query Subject 1</div>
                    <div className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                  </li>
                  <li className="py-2">
                    <div className="text-gray-800 font-semibold">Query Subject 2</div>
                    <div className="text-gray-600">Pellentesque eget ante non leo posuere volutpat.</div>
                  </li>
                  <li className="py-2">
                    <div className="text-gray-800 font-semibold">Query Subject 3</div>
                    <div className="text-gray-600">Donec nec nisi eget nunc lobortis commodo.</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
