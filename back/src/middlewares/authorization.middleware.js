//0 full-admin, 1 admin, 2 user
function authorizeFullAdmin(req, res, next) {
  if (req.user.profile_id === 0) { // 0 = Full-Admin
    return next(); // Permite o acesso
  }
  return res.status(403).json({ error: `Access denied, You are ${req.user.profile_id}. Full-Admins only.` }); // Código HTTP 403: Proibido
}
function authorizeFullAdminOrAdmin(req, res, next) {
  if (req.user.profile_id === 0 || req.user.profile_id === 1) { // 0 = Full-Admin, 1 = Admin
    return next(); // Permite o acesso
  }
  return res.status(403).json({ error: `Access denied, You are ${req.user.profile_id}. Full-Admins or Admins only.` }); // Código HTTP 403: Proibido
}

function authorizeAdmin(req, res, next) {
  if (req.user.profile_id === 1) { // 1 = Admin
    return next(); // Permite o acesso
  }
  return res.status(403).json({ error: `Access denied, You are ${req.user.profile_id}. Admins only.` }); // Código HTTP 403: Proibido
}

function authorizeUserOrAdmin(req, res, next) {
  if (req.user.profile_id === 0 || req.user.profile_id === 1 || req.user.profile_id === 2) { // 0 = Full-Admin, 1 = Admin, 2 = User
    return next(); // Permite o acesso
  }
  return res.status(403).json({ error: `Access denied, You are ${req.user.profile_id}. Users, Admins, or Full-Admins only.` }); // Código HTTP 403: Proibido
}

module.exports = { authorizeFullAdmin, authorizeAdmin, authorizeUserOrAdmin, authorizeFullAdminOrAdmin };