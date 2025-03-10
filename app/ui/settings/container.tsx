export default async function SettingsContainer() {
  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            {/* Account Settings */}
            <div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Subscription Plan
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                  <option>Free</option>
                  <option>Pro</option>
                  <option>Enterprise</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <input
                  type="text"
                  name="paymentMethod"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Notification Settings */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Email Notifications
              </label>
              <input
                type="checkbox"
                name="emailNotifications"
                className="mt-1"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                SMS Notifications
              </label>
              <input type="checkbox" name="smsNotifications" className="mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
