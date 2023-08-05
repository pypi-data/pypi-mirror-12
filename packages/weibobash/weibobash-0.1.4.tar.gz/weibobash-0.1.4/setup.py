#coding:utf-8
__author__ = 'zhuzhezhe'
try:
    from setuptools import setup, find_packages
except:
    from distutils.core import setup

version = '0.1.4'

setup(name='weibobash',
      version=version,
      packages=find_packages(),
      description="新浪微博命令行工具",
      long_description="""新浪微博命令行工具,支持发布微博,获取最新微博""",
      keywords='python weibobash dictionary terminal',
      author='zhuzhezhe',
      author_email='zhuzhezhe95@163.com',
      url='https://github.com/zhuzhezhe/weibobash',
      license='MIT',
      include_package_data=True,
      zip_safe=False,
      install_requires=[
        'weibo',
      ],
      package_data={
        '': ['*.txt', '*.ini'],
        },
      # 配置使在命令行运行
       entry_points={
        'console_scripts':[
            'weibobash = weibo_bash.weibo_bash:main'
        ]
      },
      use_2to3=True,
)