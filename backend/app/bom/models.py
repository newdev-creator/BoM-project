from django.db import models

class Component(models.Model):
    """Structure of the component for a BoM"""
    reference = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    quantity = models.IntegerField()
    component_type = models.CharField(
        max_length=50,
        choices=[
            ('assembly', 'Ensemble'),
            ('sub_assembly', 'Sous-ensemble'),
            ('part', 'Pièce'),
            ('raw_material', 'Matière première'),
        ],
        default='part'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.reference

    class Meta:
        ordering = ['reference']


class Relationship(models.Model):
    """Relationship between components"""
    parent = models.ForeignKey(Component, related_name='child_components', on_delete=models.CASCADE)
    child = models.ForeignKey(Component, related_name='parent_components', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.parent.reference} -> {self.child.reference} (x{self.quantity})"

    class Meta:
        unique_together = ('parent', 'child')
        ordering = ['parent__reference']
