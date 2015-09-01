<?php get_header(); ?>

<div id="overlay"></div>

<div class="container frame">

  <nav class="col-md-1 col-sm-1" id="navigation-column-title"><a href="http://93.95.228.60/projects/ccap/" class="logo">ccap</a>
</nav>
  
  <nav class="col-md-1 col-sm-2" id="navigation-column-one"></nav>

  <nav class="col-md-1 col-sm-1" id="navigation-column-two">
    <div id="inner-nav-container-column-two" class="mobile-nav"></div>
  </nav>

  <nav class="col-md-2 col-sm-2" id="navigation-column-three">
    <div id="inner-nav-container-column-three" class="mobile-nav"></div>
  </nav>

  <main class="col-md-7 col-sm-6" id="main-content-area">
    <div id="inner-container-main-content-area" class="mobile-nav"></div>
  </main>


  <footer class="col-md-12">
    <div class="col-md-2 col-sm-2">
      <?php echo get_field( "column_1", 131)?>
    </div>
    <div class="col-md-2 col-sm-2">
      <div class="line-break-single"></div>
      <?php echo get_field( "column_2", 131)?>
    </div>
  </footer>

</div>

<?php get_footer(); ?>