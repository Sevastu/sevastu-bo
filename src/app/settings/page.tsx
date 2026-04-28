"use client"
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Palette, 
  Moon, 
  Sun, 
  Monitor,
  Type,
  Bell,
  Lock,
  User,
  Database,
  HelpCircle,
  ChevronRight,
  Check
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
// import { DashboardLayout } from '../components/layout/DashboardLayout';

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
  fontSize: 'small' | 'medium' | 'large';
  sidebarCollapsed: boolean;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  jobUpdates: boolean;
  workerUpdates: boolean;
  systemAlerts: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  loginAlerts: boolean;
}

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('appearance');
  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: 'light',
    accentColor: 'blue',
    fontSize: 'medium',
    sidebarCollapsed: false
  });

  // Apply theme to document root
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', appearance.theme === 'dark');
    root.classList.toggle('light', appearance.theme === 'light');
  }, [appearance.theme]);

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    jobUpdates: true,
    workerUpdates: true,
    systemAlerts: false
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAlerts: true
  });

  const accentColors = [
    { name: 'Blue', value: 'blue', class: 'bg-blue-600' },
    { name: 'Green', value: 'green', class: 'bg-green-600' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-600' },
    { name: 'Orange', value: 'orange', class: 'bg-orange-600' },
    { name: 'Red', value: 'red', class: 'bg-red-600' },
    { name: 'Gray', value: 'gray', class: 'bg-gray-600' }
  ];

  const fontSizes = [
    { name: 'Small', value: 'small', description: 'Compact text size' },
    { name: 'Medium', value: 'medium', description: 'Default text size' },
    { name: 'Large', value: 'large', description: 'Larger, more readable text' }
  ];

  const settingsTabs = [
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Security', icon: <Lock size={18} /> },
    { id: 'account', label: 'Account', icon: <User size={18} /> },
    { id: 'data', label: 'Data & Privacy', icon: <Database size={18} /> },
    { id: 'help', label: 'Help', icon: <HelpCircle size={18} /> }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-primary">Settings</h1>
          <p className="text-gray-600">Manage your account and application preferences</p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <nav className="space-y-1">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-border)] p-6 space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-[var(--color-text)] mb-6">Appearance Settings</h2>
                  <p className="text-[var(--color-text-secondary)]">Customize how application looks and feels</p>
                </div>

                {/* Theme Selection */}
                <div>
                  <h3 className="text-lg font-medium text-[var(--color-text)] mb-4">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'light', label: 'Light', icon: <Sun size={20} />, description: 'Clean and bright interface' },
                      { value: 'dark', label: 'Dark', icon: <Moon size={20} />, description: 'Easy on the eyes' },
                      { value: 'system', label: 'System', icon: <Monitor size={20} />, description: 'Follow your system preference' }
                    ].map((theme) => (
                      <button
                        key={theme.value}
                        onClick={() => setAppearance(prev => ({ ...prev, theme: theme.value as any }))}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          appearance.theme === theme.value
                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                            : 'border-[var(--color-border)] hover:border-[var(--color-border)]'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className={`p-2 rounded-lg ${
                            appearance.theme === theme.value ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-muted)] text-[var(--color-text-secondary)]'
                          }`}>
                            {theme.icon}
                          </div>
                          <div className="font-medium text-[var(--color-text)]">{theme.label}</div>
                          <div className="text-sm text-[var(--color-text-secondary)]">{theme.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accent Color */}
                <div>
                  <h3 className="text-lg font-medium text-[var(--color-text)] mb-4">Accent Color</h3>
                  <div className="grid grid-cols-6 gap-3">
                    {accentColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setAppearance(prev => ({ ...prev, accentColor: color.value }))}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          appearance.accentColor === color.value
                            ? 'border-[var(--color-text)] scale-110'
                            : 'border-[var(--color-border)] hover:border-[var(--color-border)]'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-8 h-8 rounded-full ${
                            appearance.accentColor === color.value ? 'bg-blue-600' : color.class
                          }`}></div>
                          <div className="text-sm font-medium text-[var(--color-text)]">{color.name}</div>
                          {appearance.accentColor === color.value && (
                            <Check size={16} className="text-[var(--color-success)]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <h3 className="text-lg font-medium text-[var(--color-text)] mb-4">Font Size</h3>
                  <div className="space-y-3">
                    {fontSizes.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setAppearance(prev => ({ ...prev, fontSize: size.value as any }))}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          appearance.fontSize === size.value
                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                            : 'border-[var(--color-border)] hover:border-[var(--color-border)]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <div className="font-medium text-[var(--color-text)]">{size.name}</div>
                            <div className="text-sm text-[var(--color-text-secondary)]">{size.description}</div>
                          </div>
                          {appearance.fontSize === size.value && (
                            <Check size={20} className="text-[var(--color-primary)]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sidebar Settings */}
                <div>
                  <h3 className="text-lg font-medium text-[var(--color-text)] mb-4">Sidebar</h3>
                  <div className="flex items-center justify-between p-4 border border-[var(--color-border)] rounded-lg">
                    <div>
                      <div className="font-medium text-[var(--color-text)]">Collapse Sidebar</div>
                      <div className="text-sm text-[var(--color-text-secondary)]">Hide sidebar to maximize screen space</div>
                    </div>
                    <button
                      onClick={() => setAppearance(prev => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        appearance.sidebarCollapsed ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-muted)]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          appearance.sidebarCollapsed ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Preview */}
                <div className="border-t border-[var(--color-border)] pt-6">
                  <h3 className="text-lg font-medium text-[var(--color-text)] mb-4">Preview</h3>
                  <div className="p-6 bg-[var(--color-muted)] rounded-lg">
                    <div className="text-center text-[var(--color-text-secondary)]">
                      Preview of your appearance settings will appear here.
                      <br />
                      Changes are applied immediately across the application.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-border)] p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-[var(--color-text)] mb-6">Notification Preferences</h2>
                  <p className="text-[var(--color-text-secondary)]">Control how and when you receive notifications</p>
                </div>

                {[
                  { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
                  { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser push notifications' },
                  { key: 'jobUpdates', label: 'Job Updates', description: 'New jobs and status changes' },
                  { key: 'workerUpdates', label: 'Worker Updates', description: 'Worker applications and changes' },
                  { key: 'systemAlerts', label: 'System Alerts', description: 'Important system notifications' }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 border border-[var(--color-border)] rounded-lg">
                    <div>
                      <div className="font-medium text-[var(--color-text)]">{setting.label}</div>
                      <div className="text-sm text-[var(--color-text-secondary)]">{setting.description}</div>
                    </div>
                    <button
                      onClick={() => setNotifications(prev => ({ ...prev, [setting.key]: !prev[setting.key as keyof NotificationSettings] }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications[setting.key as keyof NotificationSettings] ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-muted)]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications[setting.key as keyof NotificationSettings] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-border)] p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-[var(--color-text)] mb-6">Security Settings</h2>
                  <p className="text-[var(--color-text-secondary)]">Manage your account security and access</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-[var(--color-border)] rounded-lg">
                    <div>
                      <div className="font-medium text-[var(--color-text)]">Two-Factor Authentication</div>
                      <div className="text-sm text-[var(--color-text-secondary)]">Add an extra layer of security</div>
                    </div>
                    <button
                      onClick={() => setSecurity(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        security.twoFactorAuth ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-muted)]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-[var(--color-border)] rounded-lg">
                    <div>
                      <div className="font-medium text-[var(--color-text)]">Login Alerts</div>
                      <div className="text-sm text-[var(--color-text-secondary)]">Get notified of new logins</div>
                    </div>
                    <button
                      onClick={() => setSecurity(prev => ({ ...prev, loginAlerts: !prev.loginAlerts }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        security.loginAlerts ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-muted)]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs (Account, Data & Privacy, Help) */}
            {activeTab !== 'appearance' && activeTab !== 'notifications' && activeTab !== 'security' && (
              <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-border)] p-8">
                <div className="text-center py-12">
                  <SettingsIcon size={48} className="text-[var(--color-primary)] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[var(--color-text)] mb-2">
                    {settingsTabs.find(tab => tab.id === activeTab)?.label}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] mb-6">
                    This section is under development. More settings coming soon.
                  </p>
                  <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary)] transition-colors">
                    Coming Soon
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
export default Settings;
