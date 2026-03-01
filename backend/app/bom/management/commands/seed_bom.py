from django.core.management.base import BaseCommand
from django.db import transaction
from app.bom.models import Component, Relationship
import random
from faker import Faker

class Command(BaseCommand):
    help = 'Seeds the database with 100 components and various relationships.'

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding database with components and relationships...")
        fake = Faker()

        # Clear existing data (optional, but good for re-seeding)
        Relationship.objects.all().delete()
        Component.objects.all().delete()

        components = []
        component_types = [choice[0] for choice in Component._meta.get_field('component_type').choices]

        self.stdout.write("Creating 100 components...")
        for i in range(100):
            component_type = random.choice(component_types)
            component = Component.objects.create(
                reference=f"{fake.word()}-{i+1}",
                description=fake.sentence(nb_words=6),
                quantity=random.randint(1, 100),
                component_type=component_type,
            )
            components.append(component)
        self.stdout.write(self.style.SUCCESS(f"Created {len(components)} components."))

        self.stdout.write("Creating relationships...")
        # Create relationships: each component can be a child of 0-3 other components
        for child_component in components:
            num_parents = random.randint(0, 3)
            possible_parents = [c for c in components if c != child_component]
            random.shuffle(possible_parents)

            for _ in range(num_parents):
                if not possible_parents:
                    break
                parent_component = possible_parents.pop()
                
                # Avoid creating a relationship if it already exists or if it's a self-relationship
                if not Relationship.objects.filter(parent=parent_component, child=child_component).exists():
                    try:
                        Relationship.objects.create(
                            parent=parent_component,
                            child=child_component,
                            quantity=random.randint(1, 5)
                        )
                    except Exception as e:
                        self.stdout.write(self.style.WARNING(f"Could not create relationship between {parent_component.reference} and {child_component.reference}: {e}"))
        
        self.stdout.write(self.style.SUCCESS("Finished seeding database."))

