const getSupervisor = (req, res) => res.json({ message: 'Supervisor data retrieved' });
const updateSupervisor = (req, res) => res.json({ message: 'Supervisor updated' });
const deleteSupervisor = (req, res) => res.json({ message: 'Supervisor deleted' });

module.exports = { getSupervisor, updateSupervisor, deleteSupervisor };
