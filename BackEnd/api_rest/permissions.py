from rest_framework import permissions

class ReadOnlyOrAuthenticated(permissions.BasePermission):
    """
    Permite leitura pública, mas escrita apenas para usuários autenticados.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True  
        return request.user and request.user.is_authenticated

class IsAdminRole(permissions.BasePermission):
    """
    Permite acesso apenas para usuários com role='admin'.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role == 'admin' and
            request.user.is_active
        )

    def has_object_permission(self, request, view, obj):
        is_admin = bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role == 'admin' and
            request.user.is_active
        )

        if not is_admin:
            return False
            
        if request.method == 'DELETE' and obj.id == request.user.id:
            return False
            
        return True  
