from rest_framework import permissions

class ReadOnlyOrAuthenticated(permissions.BasePermission):
    """
    Permite leitura pública, mas escrita apenas para usuários autenticados.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True  
        return request.user and request.user.is_authenticated  
