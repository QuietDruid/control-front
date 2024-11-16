import { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

const CreateAClass = () => {
  // Server configuration options
  const ubuntuVersions = [
    { value: '18.04', label: 'Ubuntu 18.04 LTS' },
    { value: '20.04', label: 'Ubuntu 20.04 LTS' },
    { value: '22.04', label: 'Ubuntu 22.04 LTS' },
    { value: '24.04', label: 'Ubuntu 24.04 LTS' }
  ];

  const vmTypes = [
    { value: 'm1', label: 'M1 (1 vCPU, 2GB RAM)', specs: { vcpu: 1, ram: 2 } },
    { value: 'm2', label: 'M2 (2 vCPU, 4GB RAM)', specs: { vcpu: 2, ram: 4 } },
    { value: 'm3', label: 'M3 (4 vCPU, 8GB RAM)', specs: { vcpu: 4, ram: 8 } },
  ];

  // State management
  const [selectedVersion, setSelectedVersion] = useState('');
  const [selectedVMType, setSelectedVMType] = useState('');
  const [students, setStudents] = useState([]);
  const [csvFileName, setCsvFileName] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Handle CSV file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        setError('Please upload a valid CSV file');
        return;
      }

      setCsvFileName(file.name);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const text = e.target?.result;
          if (typeof text === 'string') {
            const rows = text.split('\n');
          const parsedStudents = rows
            .filter(row => row.trim()) // Remove empty rows
            .map(row => {
              const [name, email] = row.split(',').map(item => item.trim());
              if (!name || !email) throw new Error('Invalid CSV format');
              if (!email.includes('@')) throw new Error('Invalid email format');
              return { name, email };
            });
            setStudents(parsedStudents);
          }
          setStudents(parsedStudents);
          setError('');
        } catch (err) {
          setError('Error parsing CSV. Please ensure the format is: name,email@example.com');
          setStudents([]);
        }
      };

      reader.onerror = () => {
        setError('Error reading file');
      };

      reader.readAsText(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (students.length === 0) {
      setError('Please upload a class roster CSV file');
      return;
    }
    
    console.log({
      ubuntuVersion: selectedVersion,
      vmType: selectedVMType,
      roster: students
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Ubuntu Server Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ubuntu Version Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Ubuntu Version</label>
              <select 
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
                className="w-full p-2 border rounded-md bg-white"
                required
              >
                <option value="">Select Ubuntu Version</option>
                {ubuntuVersions.map((version) => (
                  <option key={version.value} value={version.value}>
                    {version.label}
                  </option>
                ))}
              </select>
            </div>

            {/* VM Type Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">VM Configuration</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vmTypes.map((vm) => (
                  <div 
                    key={vm.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedVMType === vm.value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedVMType(vm.value)}
                  >
                    <h3 className="font-medium">{vm.label}</h3>
                    <p className="text-sm text-gray-600">
                      {vm.specs.vcpu} vCPU • {vm.specs.ram}GB RAM • 8GB Storage
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CSV Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-medium">Class Roster CSV</label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <div className="space-y-4">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div>
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="mx-auto"
                    >
                      Choose CSV File
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Upload a CSV file with columns: name, email
                  </p>
                  {csvFileName && (
                    <p className="text-sm text-green-600">
                      Uploaded: {csvFileName}
                    </p>
                  )}
                  {error && (
                    <p className="text-sm text-red-500">
                      {error}
                    </p>
                  )}
                </div>
              </div>

              {/* Preview Table */}
              {students.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Class Roster Preview</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Email
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((student, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {student.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {student.email}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                type="submit"
                className="px-6"
                disabled={!selectedVersion || !selectedVMType || students.length === 0}
              >
                Send Configuration
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAClass;