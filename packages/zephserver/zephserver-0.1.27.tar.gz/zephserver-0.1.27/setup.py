from setuptools import setup, find_packages
setup(
    name='zephserver',
    packages=find_packages(),
    version='0.1.27',
    description='Python service manager that can be used as a websocket server',
    author='CDSP',
    author_email='zephserver-scpolst@sciencespo.fr',
    url='https://github.com/CDSP/zephserver',
    keywords=['websocket', 'zeph', 'server', 'zephserver'],
    install_requires=['tornado'],
    classifiers=['Operating System :: POSIX',
                 'Development Status :: 2 - Pre-Alpha',
                 'License :: OSI Approved :: GNU General Public License v3 (GPLv3)',
                 'Programming Language :: Python :: 2.7'],
    include_package_data=True,
    zip_safe=False,
    entry_points = {
        'console_scripts': ['zephserver-stop=zephserver.admin.command:stop',
                            'zephserver-command=zephserver.admin.command:command'],
    }
)
