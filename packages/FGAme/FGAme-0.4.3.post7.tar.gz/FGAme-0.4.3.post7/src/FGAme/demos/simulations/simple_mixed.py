from FGAme import *

# Cria mundo e objetos
world = World()
world.add_bounds(width=10)
obj1 = RegularPoly(N=3, length=130, pos=(200, 300),
<<<<<<< HEAD
                   vel=(500, -10), color='random', omega=2.2)
=======
                   vel=(200, -10), color='random', omega=2.2)
>>>>>>> origin/master
obj2 = AABB(shape=(100, 80), pos=(200, 450), color='random')
obj3 = Circle(40, pos=(600, 300), color='random', mass='inf')
obj4 = Circle(40, pos=(450, 100), color='random')

# Insere objetos e inicia rastreio de energia
world.register_energy_tracker()
world.add([obj1, obj2, obj3, obj4])
world.run()
