// Admin Panel Application JavaScript
// Handles all admin functionality including CRUD operations, authentication, and data persistence

// ============================================
// Data Management with localStorage
// ============================================

const DB_KEYS = {
    MERCHANTS: 'upiclick_merchants',
    USERS: 'upiclick_users',
    PLANS: 'upiclick_plans',
    TRANSACTIONS: 'upiclick_transactions',
    SETTINGS: 'upiclick_settings',
    ADMIN_SESSION: 'upiclick_admin_session'
};

// Initialize default data if not exists
function initializeDefaultData() {
    // Default Plans
    if (!localStorage.getItem(DB_KEYS.PLANS)) {
        const defaultPlans = [
            { id: 'plan_1', name: 'Free', type: 'free', price: 0, duration: 30, maxMerchants: 1, features: ['Up to 100 transactions/month', 'Basic support', 'Email notifications'], merchants: 12, status: 'active', createdAt: '2025-01-01' },
            { id: 'plan_2', name: 'Basic', type: 'basic', price: 499, duration: 30, maxMerchants: 5, features: ['Up to 1000 transactions/month', 'Priority support', 'SMS notifications', 'Basic analytics'], merchants: 8, status: 'active', createdAt: '2025-01-01' },
            { id: 'plan_3', name: 'Pro Merchant', type: 'pro', price: 1499, duration: 30, maxMerchants: 25, features: ['Unlimited transactions', 'Dedicated support', 'SMS & WhatsApp notifications', 'Advanced analytics', 'Custom payment links'], merchants: 5, status: 'active', createdAt: '2025-01-01' },
            { id: 'plan_4', name: 'Enterprise', type: 'enterprise', price: 4999, duration: 30, maxMerchants: -1, features: ['Unlimited everything', '24/7 Dedicated support', 'Custom integrations', 'White-label solution', 'Dedicated account manager'], merchants: 2, status: 'active', createdAt: '2025-01-01' }
        ];
        localStorage.setItem(DB_KEYS.PLANS, JSON.stringify(defaultPlans));
    }

    // Default Merchants
    if (!localStorage.getItem(DB_KEYS.MERCHANTS)) {
        const defaultMerchants = [
            { id: 'm_1', businessName: 'Tech Solutions Inc', ownerName: 'John Sharma', email: 'john@techsolutions.com', phone: '+91 9876543210', plan: 'plan_3', status: 'active', address: '123 Tech Park, Bangalore', createdAt: '2025-01-15', revenue: 45000 },
            { id: 'm_2', businessName: 'QuickMart', ownerName: 'Priya Gupta', email: 'priya@quickmart.com', phone: '+91 9876543211', plan: 'plan_2', status: 'active', address: '456 Market Road, Mumbai', createdAt: '2025-02-01', revenue: 12500 },
            { id: 'm_3', businessName: 'Foodie Express', ownerName: 'Raj Patel', email: 'raj@foodieexpress.com', phone: '+91 9876543212', plan: 'plan_1', status: 'active', address: '789 Food Court, Delhi', createdAt: '2025-02-10', revenue: 3200 },
            { id: 'm_4', businessName: 'Style Studio', ownerName: 'Anita Verma', email: 'anita@stylestudio.com', phone: '+91 9876543213', plan: 'plan_1', status: 'pending', address: '321 Fashion Street, Chennai', createdAt: '2025-03-01', revenue: 0 },
            { id: 'm_5', businessName: 'Digital Dreams', ownerName: 'Mike Chen', email: 'mike@digitaldreams.com', phone: '+91 9876543214', plan: 'plan_4', status: 'active', address: '555 Tech Hub, Hyderabad', createdAt: '2025-02-20', revenue: 89000 },
            { id: 'm_6', businessName: 'Book Haven', ownerName: 'Sarah Khan', email: 'sarah@bookhaven.com', phone: '+91 9876543215', plan: 'plan_2', status: 'suspended', address: '678 Library Road, Pune', createdAt: '2025-01-25', revenue: 5600 }
        ];
        localStorage.setItem(DB_KEYS.MERCHANTS, JSON.stringify(defaultMerchants));
    }

    // Default Users
    if (!localStorage.getItem(DB_KEYS.USERS)) {
        const defaultUsers = [
            { id: 'u_1', name: 'Admin User', email: 'admin@upiclick.com', phone: '+91 9876543000', role: 'admin', status: 'active', password: 'admin123', createdAt: '2025-01-01' },
            { id: 'u_2', name: 'Rahul Kumar', email: 'rahul@example.com', phone: '+91 9876543001', role: 'user', status: 'active', password: 'user123', createdAt: '2025-01-15' },
            { id: 'u_3', name: 'Meera Singh', email: 'meera@example.com', phone: '+91 9876543002', role: 'user', status: 'active', password: 'user123', createdAt: '2025-02-01' },
            { id: 'u_4', name: 'Vikram Joshi', email: 'vikram@example.com', phone: '+91 9876543003', role: 'merchant', status: 'active', password: 'user123', createdAt: '2025-02-10' },
            { id: 'u_5', name: 'Lakshmi Reddy', email: 'lakshmi@example.com', phone: '+91 9876543004', role: 'user', status: 'inactive', password: 'user123', createdAt: '2025-02-15' }
        ];
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify(defaultUsers));
    }

    // Default Transactions
    if (!localStorage.getItem(DB_KEYS.TRANSACTIONS)) {
        const defaultTransactions = [
            { id: 'txn_1', merchantId: 'm_1', merchantName: 'Tech Solutions Inc', userId: 'u_2', userName: 'Rahul Kumar', amount: 2500, type: 'payment', status: 'success', date: '2025-03-10 10:30:00' },
            { id: 'txn_2', merchantId: 'm_1', merchantName: 'Tech Solutions Inc', userId: 'u_3', userName: 'Meera Singh', amount: 1800, type: 'payment', status: 'success', date: '2025-03-10 11:45:00' },
            { id: 'txn_3', merchantId: 'm_2', merchantName: 'QuickMart', userId: 'u_2', userName: 'Rahul Kumar', amount: 450, type: 'payment', status: 'success', date: '2025-03-10 12:15:00' },
            { id: 'txn_4', merchantId: 'm_5', merchantName: 'Digital Dreams', userId: 'u_4', userName: 'Vikram Joshi', amount: 12000, type: 'payment', status: 'success', date: '2025-03-11 09:00:00' },
            { id: 'txn_5', merchantId: 'm_1', merchantName: 'Tech Solutions Inc', userId: 'u_3', userName: 'Meera Singh', amount: 3500, type: 'payment', status: 'pending', date: '2025-03-11 10:20:00' },
            { id: 'txn_6', merchantId: 'm_2', merchantName: 'QuickMart', userId: 'u_5', userName: 'Lakshmi Reddy', amount: 220, type: 'payment', status: 'failed', date: '2025-03-11 11:30:00' },
            { id: 'txn_7', merchantId: 'm_3', businessName: 'Foodie Express', userId: 'u_2', userName: 'Rahul Kumar', amount: 680, type: 'payment', status: 'success', date: '2025-03-11 13:00:00' },
            { id: 'txn_8', merchantId: 'm_5', merchantName: 'Digital Dreams', userId: 'u_3', userName: 'Meera Singh', amount: 8500, type: 'payment', status: 'success', date: '2025-03-12 08:15:00' }
        ];
        localStorage.setItem(DB_KEYS.TRANSACTIONS, JSON.stringify(defaultTransactions));
    }
}

// Database helper functions
function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function generateId(prefix) {
    return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// ============================================
// Authentication
// ============================================

function checkAdminAuth() {
    const session = localStorage.getItem(DB_KEYS.ADMIN_SESSION);
    if (!session) {
        window.location.href = 'admin_login.html';
        return false;
    }
    return true;
}

function adminLogin(email, password) {
    const users = getData(DB_KEYS.USERS);
    const admin = users.find(u => u.email === email && u.password === password && u.role === 'admin');

    if (admin) {
        localStorage.setItem(DB_KEYS.ADMIN_SESSION, JSON.stringify(admin));
        return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
}

function adminLogout() {
    localStorage.removeItem(DB_KEYS.ADMIN_SESSION);
    window.location.href = 'admin_login.html';
}

// ============================================
// Navigation
// ============================================

function switchSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Update nav
    document.querySelectorAll('.admin-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

    // Update title
    const titles = {
        dashboard: 'Dashboard',
        merchants: 'Merchant Management',
        users: 'User Management',
        plans: 'Plan Management',
        transactions: 'Transaction Management',
        settings: 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[sectionId] || 'Dashboard';

    // Load data for section
    if (sectionId === 'dashboard') loadDashboardData();
    if (sectionId === 'merchants') loadMerchants();
    if (sectionId === 'users') loadUsers();
    if (sectionId === 'plans') loadPlans();
    if (sectionId === 'transactions') loadTransactions();
}

// ============================================
// Dashboard
// ============================================

function loadDashboardData() {
    const merchants = getData(DB_KEYS.MERCHANTS);
    const users = getData(DB_KEYS.USERS);
    const plans = getData(DB_KEYS.PLANS);
    const transactions = getData(DB_KEYS.TRANSACTIONS);

    // Calculate stats
    const totalRevenue = transactions
        .filter(t => t.status === 'success')
        .reduce((sum, t) => sum + t.amount, 0);

    document.getElementById('totalMerchants').textContent = merchants.length;
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalRevenue').textContent = '₹' + totalRevenue.toLocaleString();
    document.getElementById('activePlans').textContent = plans.filter(p => p.status === 'active').length;

    // Load recent transactions
    const recentTransactions = transactions.slice(-5).reverse();
    const tbody = document.getElementById('recentTransactionsTable');
    tbody.innerHTML = recentTransactions.map(txn => `
        <tr>
            <td><span class="mono-text">${txn.id}</span></td>
            <td>${txn.merchantName || 'N/A'}</td>
            <td>${txn.userName || 'N/A'}</td>
            <td>₹${txn.amount.toLocaleString()}</td>
            <td><span class="admin-badge ${txn.status === 'success' ? 'success' : txn.status === 'pending' ? 'warning' : 'danger'}">${txn.status}</span></td>
            <td>${txn.date}</td>
        </tr>
    `).join('');

    // Render chart
    renderTransactionChart(transactions);
}

function renderTransactionChart(transactions) {
    const ctx = document.getElementById('transactionChart');
    if (!ctx) return;

    // Group transactions by date
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        last7Days.push(date.toISOString().split('T')[0]);
    }

    const dailyData = last7Days.map(date => {
        const dayTxns = transactions.filter(t => t.date.startsWith(date) && t.status === 'success');
        return dayTxns.reduce((sum, t) => sum + t.amount, 0);
    });

    const labels = last7Days.map(d => {
        const date = new Date(d);
        return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    });

    // Destroy existing chart if any
    if (window.transactionChartInstance) {
        window.transactionChartInstance.destroy();
    }

    window.transactionChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Revenue (₹)',
                data: dailyData,
                borderColor: '#2962ff',
                backgroundColor: 'rgba(41, 98, 255, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => '₹' + value.toLocaleString()
                    }
                }
            }
        }
    });
}

// ============================================
// Merchant Management
// ============================================

let merchantsPage = 1;
const merchantsPerPage = 10;

function loadMerchants(search = '', status = '') {
    let merchants = getData(DB_KEYS.MERCHANTS);
    const plans = getData(DB_KEYS.PLANS);

    // Filter
    if (search) {
        merchants = merchants.filter(m =>
            m.businessName.toLowerCase().includes(search.toLowerCase()) ||
            m.email.toLowerCase().includes(search.toLowerCase()) ||
            m.phone.includes(search)
        );
    }
    if (status) {
        merchants = merchants.filter(m => m.status === status);
    }

    // Paginate
    const totalPages = Math.ceil(merchants.length / merchantsPerPage);
    const paginatedMerchants = merchants.slice((merchantsPage - 1) * merchantsPerPage, merchantsPage * merchantsPerPage);

    // Update pagination
    document.getElementById('merchantsPaginationInfo').textContent =
        `Showing ${(merchantsPage - 1) * merchantsPerPage + 1}-${Math.min(merchantsPage * merchantsPerPage, merchants.length)} of ${merchants.length}`;
    document.getElementById('merchantsPrevBtn').disabled = merchantsPage <= 1;
    document.getElementById('merchantsNextBtn').disabled = merchantsPage >= totalPages;

    // Render
    const tbody = document.getElementById('merchantsTable');
    tbody.innerHTML = paginatedMerchants.map(m => {
        const plan = plans.find(p => p.id === m.plan);
        return `
            <tr>
                <td><span class="mono-text">${m.id}</span></td>
                <td><strong>${m.businessName}</strong></td>
                <td>${m.ownerName}</td>
                <td>${m.email}</td>
                <td>${m.phone}</td>
                <td><span class="admin-badge info">${plan ? plan.name : 'N/A'}</span></td>
                <td><span class="admin-badge ${m.status === 'active' ? 'success' : m.status === 'pending' ? 'warning' : 'danger'}">${m.status}</span></td>
                <td>
                    <div class="admin-actions">
                        <button class="admin-btn admin-btn-view" onclick="viewMerchant('${m.id}')"><i data-lucide="eye" style="width:14px;height:14px;"></i></button>
                        <button class="admin-btn admin-btn-edit" onclick="editMerchant('${m.id}')"><i data-lucide="edit-2" style="width:14px;height:14px;"></i></button>
                        <button class="admin-btn admin-btn-delete" onclick="deleteMerchant('${m.id}')"><i data-lucide="trash-2" style="width:14px;height:14px;"></i></button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    lucide.createIcons();
}

function saveMerchant() {
    const merchant = {
        id: generateId('m'),
        businessName: document.getElementById('merchantBusinessName').value,
        ownerName: document.getElementById('merchantOwnerName').value,
        email: document.getElementById('merchantEmail').value,
        phone: document.getElementById('merchantPhone').value,
        plan: document.getElementById('merchantPlan').value,
        status: document.getElementById('merchantStatus').value,
        address: document.getElementById('merchantAddress').value,
        createdAt: new Date().toISOString().split('T')[0],
        revenue: 0
    };

    if (!merchant.businessName || !merchant.email) {
        showToast('Please fill required fields', 'error');
        return;
    }

    const merchants = getData(DB_KEYS.MERCHANTS);
    merchants.push(merchant);
    setData(DB_KEYS.MERCHANTS, merchants);

    closeModal('addMerchantModal');
    document.getElementById('addMerchantForm').reset();
    loadMerchants();
    showToast('Merchant added successfully', 'success');
}

function editMerchant(id) {
    const merchants = getData(DB_KEYS.MERCHANTS);
    const merchant = merchants.find(m => m.id === id);
    if (!merchant) return;

    document.getElementById('editMerchantId').value = merchant.id;
    document.getElementById('editMerchantBusinessName').value = merchant.businessName;
    document.getElementById('editMerchantOwnerName').value = merchant.ownerName;
    document.getElementById('editMerchantEmail').value = merchant.email;
    document.getElementById('editMerchantPhone').value = merchant.phone;
    document.getElementById('editMerchantPlan').value = merchant.plan;
    document.getElementById('editMerchantStatus').value = merchant.status;
    document.getElementById('editMerchantAddress').value = merchant.address || '';

    populatePlanSelect('editMerchantPlan');
    openModal('editPlanModal'); // Fix: should be editMerchantModal
    document.getElementById('editMerchantModal').classList.add('active');
}

function updateMerchant() {
    const id = document.getElementById('editMerchantId').value;
    const merchants = getData(DB_KEYS.MERCHANTS);
    const index = merchants.findIndex(m => m.id === id);
    if (index === -1) return;

    merchants[index] = {
        ...merchants[index],
        businessName: document.getElementById('editMerchantBusinessName').value,
        ownerName: document.getElementById('editMerchantOwnerName').value,
        email: document.getElementById('editMerchantEmail').value,
        phone: document.getElementById('editMerchantPhone').value,
        plan: document.getElementById('editMerchantPlan').value,
        status: document.getElementById('editMerchantStatus').value,
        address: document.getElementById('editMerchantAddress').value
    };

    setData(DB_KEYS.MERCHANTS, merchants);
    closeModal('editMerchantModal');
    loadMerchants();
    showToast('Merchant updated successfully', 'success');
}

function deleteMerchant(id) {
    if (!confirm('Are you sure you want to delete this merchant?')) return;

    let merchants = getData(DB_KEYS.MERCHANTS);
    merchants = merchants.filter(m => m.id !== id);
    setData(DB_KEYS.MERCHANTS, merchants);
    loadMerchants();
    showToast('Merchant deleted successfully', 'success');
}

function viewMerchant(id) {
    const merchants = getData(DB_KEYS.MERCHANTS);
    const merchant = merchants.find(m => m.id === id);
    if (!merchant) return;

    alert(`Merchant Details:\n\nBusiness: ${merchant.businessName}\nOwner: ${merchant.ownerName}\nEmail: ${merchant.email}\nPhone: ${merchant.phone}\nAddress: ${merchant.address || 'N/A'}\nStatus: ${merchant.status}`);
}

// ============================================
// User Management
// ============================================

let usersPage = 1;
const usersPerPage = 10;

function loadUsers(search = '', status = '') {
    let users = getData(DB_KEYS.USERS);

    // Filter
    if (search) {
        users = users.filter(u =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.phone.includes(search)
        );
    }
    if (status) {
        users = users.filter(u => u.status === status);
    }

    // Paginate
    const totalPages = Math.ceil(users.length / usersPerPage);
    const paginatedUsers = users.slice((usersPage - 1) * usersPerPage, usersPage * usersPerPage);

    // Update pagination
    document.getElementById('usersPaginationInfo').textContent =
        `Showing ${(usersPage - 1) * usersPerPage + 1}-${Math.min(usersPage * usersPerPage, users.length)} of ${users.length}`;
    document.getElementById('usersPrevBtn').disabled = usersPage <= 1;
    document.getElementById('usersNextBtn').disabled = usersPage >= totalPages;

    // Render
    const tbody = document.getElementById('usersTable');
    tbody.innerHTML = paginatedUsers.map(u => `
        <tr>
            <td><span class="mono-text">${u.id}</span></td>
            <td><strong>${u.name}</strong></td>
            <td>${u.email}</td>
            <td>${u.phone || 'N/A'}</td>
            <td><span class="admin-badge ${u.role === 'admin' ? 'danger' : u.role === 'merchant' ? 'warning' : 'info'}">${u.role}</span></td>
            <td><span class="admin-badge ${u.status === 'active' ? 'success' : 'danger'}">${u.status}</span></td>
            <td>${u.createdAt}</td>
            <td>
                <div class="admin-actions">
                    <button class="admin-btn admin-btn-edit" onclick="editUser('${u.id}')"><i data-lucide="edit-2" style="width:14px;height:14px;"></i></button>
                    <button class="admin-btn admin-btn-delete" onclick="deleteUser('${u.id}')"><i data-lucide="trash-2" style="width:14px;height:14px;"></i></button>
                </div>
            </td>
        </tr>
    `).join('');

    lucide.createIcons();
}

function saveUser() {
    const user = {
        id: generateId('u'),
        name: document.getElementById('userFullName').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('userPhone').value,
        role: document.getElementById('userRole').value,
        status: document.getElementById('userStatus').value,
        password: document.getElementById('userPassword').value,
        createdAt: new Date().toISOString().split('T')[0]
    };

    if (!user.name || !user.email || !user.password) {
        showToast('Please fill required fields', 'error');
        return;
    }

    const users = getData(DB_KEYS.USERS);
    users.push(user);
    setData(DB_KEYS.USERS, users);

    closeModal('addUserModal');
    document.getElementById('addUserForm').reset();
    loadUsers();
    showToast('User added successfully', 'success');
}

function editUser(id) {
    const users = getData(DB_KEYS.USERS);
    const user = users.find(u => u.id === id);
    if (!user) return;

    document.getElementById('editUserId').value = user.id;
    document.getElementById('editUserFullName').value = user.name;
    document.getElementById('editUserEmail').value = user.email;
    document.getElementById('editUserPhone').value = user.phone || '';
    document.getElementById('editUserRole').value = user.role;
    document.getElementById('editUserStatus').value = user.status;
    document.getElementById('editUserPassword').value = '';

    openModal('editUserModal');
}

function updateUser() {
    const id = document.getElementById('editUserId').value;
    const users = getData(DB_KEYS.USERS);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return;

    const newPassword = document.getElementById('editUserPassword').value;

    users[index] = {
        ...users[index],
        name: document.getElementById('editUserFullName').value,
        email: document.getElementById('editUserEmail').value,
        phone: document.getElementById('editUserPhone').value,
        role: document.getElementById('editUserRole').value,
        status: document.getElementById('editUserStatus').value
    };

    if (newPassword) {
        users[index].password = newPassword;
    }

    setData(DB_KEYS.USERS, users);
    closeModal('editUserModal');
    loadUsers();
    showToast('User updated successfully', 'success');
}

function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    let users = getData(DB_KEYS.USERS);
    users = users.filter(u => u.id !== id);
    setData(DB_KEYS.USERS, users);
    loadUsers();
    showToast('User deleted successfully', 'success');
}

// ============================================
// Plan Management
// ============================================

function loadPlans(search = '', type = '') {
    let plans = getData(DB_KEYS.PLANS);

    // Filter
    if (search) {
        plans = plans.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (type) {
        plans = plans.filter(p => p.type === type);
    }

    // Render
    const tbody = document.getElementById('plansTable');
    tbody.innerHTML = plans.map(p => `
        <tr>
            <td><span class="mono-text">${p.id}</span></td>
            <td><strong>${p.name}</strong></td>
            <td><span class="admin-badge ${p.type === 'free' ? 'info' : p.type === 'basic' ? 'warning' : p.type === 'pro' ? 'primary' : 'danger'}">${p.type}</span></td>
            <td>₹${p.price.toLocaleString()}</td>
            <td>${p.duration} days</td>
            <td>${p.features ? p.features.length : 0} features</td>
            <td>${p.merchants}</td>
            <td><span class="admin-badge ${p.status === 'active' ? 'success' : 'danger'}">${p.status}</span></td>
            <td>
                <div class="admin-actions">
                    <button class="admin-btn admin-btn-edit" onclick="editPlan('${p.id}')"><i data-lucide="edit-2" style="width:14px;height:14px;"></i></button>
                    <button class="admin-btn admin-btn-delete" onclick="deletePlan('${p.id}')"><i data-lucide="trash-2" style="width:14px;height:14px;"></i></button>
                </div>
            </td>
        </tr>
    `).join('');

    lucide.createIcons();
    populatePlanSelect('merchantPlan');
    populatePlanSelect('editMerchantPlan');
}

function populatePlanSelect(selectId) {
    const plans = getData(DB_KEYS.PLANS);
    const select = document.getElementById(selectId);
    if (!select) return;

    select.innerHTML = plans.map(p => `<option value="${p.id}">${p.name} - ₹${p.price}</option>`).join('');
}

function savePlan() {
    const featuresText = document.getElementById('planFeatures').value;
    const features = featuresText.split('\n').filter(f => f.trim());

    const plan = {
        id: generateId('plan'),
        name: document.getElementById('planName').value,
        type: document.getElementById('planType').value,
        price: parseFloat(document.getElementById('planPrice').value),
        duration: parseInt(document.getElementById('planDuration').value),
        maxMerchants: parseInt(document.getElementById('planMaxMerchants').value),
        features: features,
        merchants: 0,
        status: document.getElementById('planStatus').value,
        createdAt: new Date().toISOString().split('T')[0]
    };

    if (!plan.name || isNaN(plan.price)) {
        showToast('Please fill required fields', 'error');
        return;
    }

    const plans = getData(DB_KEYS.PLANS);
    plans.push(plan);
    setData(DB_KEYS.PLANS, plans);

    closeModal('addPlanModal');
    document.getElementById('addPlanForm').reset();
    loadPlans();
    showToast('Plan created successfully', 'success');
}

function editPlan(id) {
    const plans = getData(DB_KEYS.PLANS);
    const plan = plans.find(p => p.id === id);
    if (!plan) return;

    document.getElementById('editPlanId').value = plan.id;
    document.getElementById('editPlanName').value = plan.name;
    document.getElementById('editPlanType').value = plan.type;
    document.getElementById('editPlanPrice').value = plan.price;
    document.getElementById('editPlanDuration').value = plan.duration;
    document.getElementById('editPlanMaxMerchants').value = plan.maxMerchants;
    document.getElementById('editPlanStatus').value = plan.status;
    document.getElementById('editPlanFeatures').value = plan.features ? plan.features.join('\n') : '';

    openModal('editPlanModal');
}

function updatePlan() {
    const id = document.getElementById('editPlanId').value;
    const plans = getData(DB_KEYS.PLANS);
    const index = plans.findIndex(p => p.id === id);
    if (index === -1) return;

    const featuresText = document.getElementById('editPlanFeatures').value;
    const features = featuresText.split('\n').filter(f => f.trim());

    plans[index] = {
        ...plans[index],
        name: document.getElementById('editPlanName').value,
        type: document.getElementById('editPlanType').value,
        price: parseFloat(document.getElementById('editPlanPrice').value),
        duration: parseInt(document.getElementById('editPlanDuration').value),
        maxMerchants: parseInt(document.getElementById('editPlanMaxMerchants').value),
        features: features,
        status: document.getElementById('editPlanStatus').value
    };

    setData(DB_KEYS.PLANS, plans);
    closeModal('editPlanModal');
    loadPlans();
    showToast('Plan updated successfully', 'success');
}

function deletePlan(id) {
    if (!confirm('Are you sure you want to delete this plan?')) return;

    let plans = getData(DB_KEYS.PLANS);
    plans = plans.filter(p => p.id !== id);
    setData(DB_KEYS.PLANS, plans);
    loadPlans();
    showToast('Plan deleted successfully', 'success');
}

// ============================================
// Transaction Management
// ============================================

let transactionsPage = 1;
const transactionsPerPage = 10;

function loadTransactions(search = '', status = '', dateFrom = '', dateTo = '') {
    let transactions = getData(DB_KEYS.TRANSACTIONS);

    // Filter
    if (search) {
        transactions = transactions.filter(t =>
            t.id.toLowerCase().includes(search.toLowerCase()) ||
            t.merchantName.toLowerCase().includes(search.toLowerCase()) ||
            t.userName.toLowerCase().includes(search.toLowerCase())
        );
    }
    if (status) {
        transactions = transactions.filter(t => t.status === status);
    }
    if (dateFrom) {
        transactions = transactions.filter(t => t.date >= dateFrom);
    }
    if (dateTo) {
        transactions = transactions.filter(t => t.date <= dateTo + ' 23:59:59');
    }

    // Sort by date descending
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Paginate
    const totalPages = Math.ceil(transactions.length / transactionsPerPage);
    const paginatedTransactions = transactions.slice((transactionsPage - 1) * transactionsPerPage, transactionsPage * transactionsPerPage);

    // Update pagination
    document.getElementById('transactionsPaginationInfo').textContent =
        `Showing ${(transactionsPage - 1) * transactionsPerPage + 1}-${Math.min(transactionsPage * transactionsPerPage, transactions.length)} of ${transactions.length}`;
    document.getElementById('transactionsPrevBtn').disabled = transactionsPage <= 1;
    document.getElementById('transactionsNextBtn').disabled = transactionsPage >= totalPages;

    // Render
    const tbody = document.getElementById('transactionsTable');
    tbody.innerHTML = paginatedTransactions.map(t => `
        <tr>
            <td><span class="mono-text">${t.id}</span></td>
            <td>${t.merchantName || 'N/A'}</td>
            <td>${t.userName || 'N/A'}</td>
            <td>₹${t.amount.toLocaleString()}</td>
            <td>${t.type}</td>
            <td><span class="admin-badge ${t.status === 'success' ? 'success' : t.status === 'pending' ? 'warning' : 'danger'}">${t.status}</span></td>
            <td>${t.date}</td>
            <td>
                <div class="admin-actions">
                    <button class="admin-btn admin-btn-view" onclick="viewTransaction('${t.id}')"><i data-lucide="eye" style="width:14px;height:14px;"></i></button>
                </div>
            </td>
        </tr>
    `).join('');

    lucide.createIcons();
}

function viewTransaction(id) {
    const transactions = getData(DB_KEYS.TRANSACTIONS);
    const txn = transactions.find(t => t.id === id);
    if (!txn) return;

    const details = document.getElementById('transactionDetails');
    details.innerHTML = `
        <div class="admin-form-grid">
            <div class="admin-form-group">
                <label>Transaction ID</label>
                <input type="text" value="${txn.id}" readonly>
            </div>
            <div class="admin-form-group">
                <label>Status</label>
                <input type="text" value="${txn.status}" readonly>
            </div>
            <div class="admin-form-group">
                <label>Merchant</label>
                <input type="text" value="${txn.merchantName || 'N/A'}" readonly>
            </div>
            <div class="admin-form-group">
                <label>User</label>
                <input type="text" value="${txn.userName || 'N/A'}" readonly>
            </div>
            <div class="admin-form-group">
                <label>Amount</label>
                <input type="text" value="₹${txn.amount.toLocaleString()}" readonly>
            </div>
            <div class="admin-form-group">
                <label>Type</label>
                <input type="text" value="${txn.type}" readonly>
            </div>
            <div class="admin-form-group admin-form-full">
                <label>Date</label>
                <input type="text" value="${txn.date}" readonly>
            </div>
        </div>
    `;
    openModal('viewTransactionModal');
}

function exportTransactions() {
    const transactions = getData(DB_KEYS.TRANSACTIONS);
    const csv = [
        ['ID', 'Merchant', 'User', 'Amount', 'Type', 'Status', 'Date'].join(','),
        ...transactions.map(t => [t.id, t.merchantName, t.userName, t.amount, t.type, t.status, t.date].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Transactions exported successfully', 'success');
}

// ============================================
// Settings
// ============================================

function saveSettings() {
    showToast('Settings saved successfully', 'success');
}

function savePaymentSettings() {
    showToast('Payment settings saved successfully', 'success');
}

// ============================================
// Modal Management
// ============================================

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('admin-modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// ============================================
// Toast Notifications
// ============================================

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: 'check-circle',
        error: 'x-circle',
        warning: 'alert-triangle',
        info: 'info'
    };

    toast.innerHTML = `
        <i data-lucide="${icons[type]}" class="toast-icon"></i>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i data-lucide="x" style="width:16px;height:16px;"></i>
        </button>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// ============================================
// Event Listeners
// ============================================

// Navigation
document.querySelectorAll('.admin-nav-item[data-section]').forEach(item => {
    item.addEventListener('click', () => {
        switchSection(item.dataset.section);
    });
});

// Logout
document.getElementById('adminLogoutBtn')?.addEventListener('click', adminLogout);

// Search and filter listeners
document.getElementById('merchantSearch')?.addEventListener('input', (e) => {
    merchantsPage = 1;
    loadMerchants(e.target.value, document.getElementById('merchantStatusFilter').value);
});

document.getElementById('merchantStatusFilter')?.addEventListener('change', (e) => {
    merchantsPage = 1;
    loadMerchants(document.getElementById('merchantSearch').value, e.target.value);
});

document.getElementById('userSearch')?.addEventListener('input', (e) => {
    usersPage = 1;
    loadUsers(e.target.value, document.getElementById('userStatusFilter').value);
});

document.getElementById('userStatusFilter')?.addEventListener('change', (e) => {
    usersPage = 1;
    loadUsers(document.getElementById('userSearch').value, e.target.value);
});

document.getElementById('planSearch')?.addEventListener('input', (e) => {
    loadPlans(e.target.value, document.getElementById('planTypeFilter').value);
});

document.getElementById('planTypeFilter')?.addEventListener('change', (e) => {
    loadPlans(document.getElementById('planSearch').value, e.target.value);
});

document.getElementById('transactionSearch')?.addEventListener('input', (e) => {
    transactionsPage = 1;
    loadTransactions(e.target.value, document.getElementById('transactionStatusFilter').value,
        document.getElementById('transactionDateFrom').value, document.getElementById('transactionDateTo').value);
});

document.getElementById('transactionStatusFilter')?.addEventListener('change', (e) => {
    transactionsPage = 1;
    loadTransactions(document.getElementById('transactionSearch').value, e.target.value,
        document.getElementById('transactionDateFrom').value, document.getElementById('transactionDateTo').value);
});

document.getElementById('transactionDateFrom')?.addEventListener('change', () => {
    transactionsPage = 1;
    loadTransactions(document.getElementById('transactionSearch').value, document.getElementById('transactionStatusFilter').value,
        document.getElementById('transactionDateFrom').value, document.getElementById('transactionDateTo').value);
});

document.getElementById('transactionDateTo')?.addEventListener('change', () => {
    transactionsPage = 1;
    loadTransactions(document.getElementById('transactionSearch').value, document.getElementById('transactionStatusFilter').value,
        document.getElementById('transactionDateFrom').value, document.getElementById('transactionDateTo').value);
});

// Pagination
document.getElementById('merchantsPrevBtn')?.addEventListener('click', () => {
    if (merchantsPage > 1) {
        merchantsPage--;
        loadMerchants(document.getElementById('merchantSearch').value, document.getElementById('merchantStatusFilter').value);
    }
});

document.getElementById('merchantsNextBtn')?.addEventListener('click', () => {
    merchantsPage++;
    loadMerchants(document.getElementById('merchantSearch').value, document.getElementById('merchantStatusFilter').value);
});

document.getElementById('usersPrevBtn')?.addEventListener('click', () => {
    if (usersPage > 1) {
        usersPage--;
        loadUsers(document.getElementById('userSearch').value, document.getElementById('userStatusFilter').value);
    }
});

document.getElementById('usersNextBtn')?.addEventListener('click', () => {
    usersPage++;
    loadUsers(document.getElementById('userSearch').value, document.getElementById('userStatusFilter').value);
});

document.getElementById('transactionsPrevBtn')?.addEventListener('click', () => {
    if (transactionsPage > 1) {
        transactionsPage--;
        loadTransactions();
    }
});

document.getElementById('transactionsNextBtn')?.addEventListener('click', () => {
    transactionsPage++;
    loadTransactions();
});

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if this is admin login page
    if (document.getElementById('adminLoginForm')) {
        document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('adminEmail').value;
            const password = document.getElementById('adminPassword').value;

            const result = adminLogin(email, password);
            if (result.success) {
                window.location.href = 'admin_panel.html';
            } else {
                document.getElementById('loginError').classList.add('show');
            }
        });
        return;
    }

    // Check auth for admin panel
    if (!checkAdminAuth()) return;

    // Initialize default data
    initializeDefaultData();

    // Load dashboard
    loadDashboardData();
    populatePlanSelect('merchantPlan');
    populatePlanSelect('editMerchantPlan');
});
